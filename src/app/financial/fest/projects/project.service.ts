import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, debounceTime, switchMap, tap } from 'rxjs';

import { API_FINANCIAL_FEST } from '../../../shared/api';
import { Grantor } from './grantors/grantor';
import { Project } from './project';
import { SortColumn, SortDirection } from './project-sortable-header.directive';

interface SearchResult {
  projects: Project[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number | Date | Grantor, v2: string | number | Date | Grantor) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(projects: Project[], column: SortColumn, direction: string): Project[] {
  if (direction === '' || column === '') {
    return projects;
  } else {
    if (column === 'grantor.name') {
      return [...projects].sort((a, b) => {
        const res = compare(a.grantor.name, b.grantor.name);
        return direction === 'asc' ? res : -res;
      });
    } else {
      return [...projects].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}

function matches(project: Project, term: string) {
  return project.name.toLowerCase().includes(term.toLowerCase()) || project.grantor.name.toLowerCase().includes(term.toLowerCase()) || project.code.toLowerCase().includes(term.toLowerCase());
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _projects$ = new BehaviorSubject<Project[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  constructor(private http: HttpClient) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        tap(() => this._loading$.next(false)),
      )
      .subscribe((result) => {
        this._projects$.next(result.projects);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get projects$() {
    return this._projects$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    return new Observable<SearchResult>((observer) => {
      this.http.get<Project[]>(API_FINANCIAL_FEST + '/projects').subscribe({
        next: (data) => {
          const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

          // 1. sort
          let projects = sort(data, sortColumn, sortDirection);

          // 2. filter
          projects = projects.filter((project) => matches(project, searchTerm));
          const total = projects.length;

          // 3. paginate
          projects = projects.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

          observer.next({ projects, total });
        },
        error: (error) => observer.error(error),
        complete: () => observer.complete(),
      });
    });
  }

  public getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(API_FINANCIAL_FEST + '/projects');
  }

  public getProject(id: number): Observable<Project | undefined> {
    return this.http.get<Project>(API_FINANCIAL_FEST + '/projects/' + id);
  }

  public create(project: Project): Observable<Project> {
    return this.http.post<Project>(API_FINANCIAL_FEST + '/projects', project);
  }

  public update(project: Project): Observable<Project> {
    return this.http.put<Project>(API_FINANCIAL_FEST + '/projects/' + project.id, project);
  }
}
