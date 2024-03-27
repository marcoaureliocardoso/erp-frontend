import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, debounceTime, switchMap, tap } from 'rxjs';

import { API_FINANCIAL_FEST } from '../../../shared/api';
import { Course } from '../courses/course';
import { Employee } from '../employees/employee';
import { Grantor } from '../projects/grantors/grantor';
import { Project } from '../projects/project';
import { Bond } from './bond';
import { SortColumn, SortDirection } from './bond-sortable-header.directive';

interface SearchResult {
  bonds: Bond[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number | Date | Grantor | Project | Course | Employee, v2: string | number | Date | Grantor | Project | Course | Employee) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(bonds: Bond[], column: SortColumn, direction: string): Bond[] {
  if (direction === '' || column === '') {
    return bonds;
  } else {
    switch (column) {
      case 'project.grantor.name':
        return [...bonds].sort((a, b) => {
          const res = compare(a.project.grantor.name, b.project.grantor.name);
          return direction === 'asc' ? res : -res;
        });
      case 'project.name':
        return [...bonds].sort((a, b) => {
          const res = compare(a.project.name, b.project.name);
          return direction === 'asc' ? res : -res;
        });
      case 'course.name':
        return [...bonds].sort((a, b) => {
          const res = compare(a.course.name, b.course.name);
          return direction === 'asc' ? res : -res;
        });
      case 'employee.givenName':
        return [...bonds].sort((a, b) => {
          const res = compare(a.employee.givenName, b.employee.givenName);
          return direction === 'asc' ? res : -res;
        });
      case 'employee.surname':
        return [...bonds].sort((a, b) => {
          const res = compare(a.employee.surname, b.employee.surname);
          return direction === 'asc' ? res : -res;
        });
      case 'terms':
        return bonds;
      default:
        return [...bonds].sort((a, b) => {
          const res = compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
        });
    }
  }
}

function matches(bond: Bond, term: string) {
  return (
    bond.project.grantor.name.toLowerCase().includes(term.toLowerCase()) ||
    bond.project.name.toLowerCase().includes(term.toLowerCase()) ||
    bond.course.name.toLowerCase().includes(term.toLowerCase()) ||
    bond.employee.givenName.toLowerCase().includes(term.toLowerCase()) ||
    bond.employee.surname.toLowerCase().includes(term.toLowerCase())
  );
}

@Injectable({
  providedIn: 'root',
})
export class BondService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _bonds$ = new BehaviorSubject<Bond[]>([]);
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
        this._bonds$.next(result.bonds);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get bonds$() {
    return this._bonds$.asObservable();
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
      this.http.get<Bond[]>(API_FINANCIAL_FEST + '/bonds').subscribe({
        next: (data) => {
          const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

          // 1. sort
          let bonds = sort(data, sortColumn, sortDirection);

          // 2. filter
          bonds = bonds.filter((bond) => matches(bond, searchTerm));
          const total = bonds.length;

          // 3. paginate
          bonds = bonds.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

          observer.next({ bonds: bonds, total });
        },
        error: (error) => observer.error(error),
        complete: () => observer.complete(),
      });
    });
  }

  public getBonds(): Observable<Bond[]> {
    return this.http.get<Bond[]>(API_FINANCIAL_FEST + '/bonds');
  }

  public getBond(id: number): Observable<Bond | undefined> {
    return this.http.get<Bond>(API_FINANCIAL_FEST + '/bonds/' + id);
  }

  public create(bond: Bond): Observable<Bond> {
    return this.http.post<Bond>(API_FINANCIAL_FEST + '/bonds', bond);
  }

  public update(bond: Bond): Observable<Bond> {
    return this.http.put<Bond>(API_FINANCIAL_FEST + '/bonds/' + bond.id, bond);
  }
}
