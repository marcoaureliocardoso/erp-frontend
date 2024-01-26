import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, debounceTime, of, switchMap, tap } from 'rxjs';

import { Project } from './project';
import { SortColumn, SortDirection } from './project-sortable-header.directive';
import { PROJECTS } from './projects';

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

const compare = (v1: string | number | Date, v2: string | number | Date) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(projects: Project[], column: SortColumn, direction: string): Project[] {
  if (direction === '' || column === '') {
    return projects;
  } else {
    return [...projects].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(project: Project, term: string) {
  return project.name.toLowerCase().includes(term.toLowerCase()) || project.grantor.toLowerCase().includes(term.toLowerCase()) || project.code.toLowerCase().includes(term.toLowerCase());
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

  constructor() {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        // delay(200),
        tap(() => this._loading$.next(false))
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
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // 1. sort
    let projects = sort(PROJECTS, sortColumn, sortDirection);

    // 2. filter
    projects = projects.filter((project) => matches(project, searchTerm));
    const total = projects.length;

    // 3. paginate
    projects = projects.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ projects, total });
  }
}
