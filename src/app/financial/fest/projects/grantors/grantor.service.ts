import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, debounceTime, switchMap, tap } from 'rxjs';

import { API_FINANCIAL_FEST } from '../../../../shared/api';
import { Grantor } from './grantor';
import { SortColumn, SortDirection } from './grantor-sortable-header.directive';

interface SearchResult {
  grantors: Grantor[];
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

function sort(grantors: Grantor[], column: SortColumn, direction: string): Grantor[] {
  if (direction === '' || column === '') {
    return grantors;
  } else {
    return [...grantors].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(grantor: Grantor, term: string) {
  return grantor.name.toLowerCase().includes(term.toLowerCase());
}

@Injectable({
  providedIn: 'root',
})
export class GrantorService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _grantors$ = new BehaviorSubject<Grantor[]>([]);
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
        this._grantors$.next(result.grantors);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get grantors$() {
    return this._grantors$.asObservable();
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
      this.http.get<Grantor[]>(API_FINANCIAL_FEST + '/grantors').subscribe({
        next: (data) => {
          const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

          // 1. sort
          let grantors = sort(data, sortColumn, sortDirection);

          // 2. filter
          grantors = grantors.filter((grantor) => matches(grantor, searchTerm));
          const total = grantors.length;

          // 3. paginate
          grantors = grantors.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

          observer.next({ grantors, total });
        },
        error: (error) => observer.error(error),
        complete: () => observer.complete(),
      });
    });
  }

  public getGrantors(): Observable<Grantor[]> {
    return this.http.get<Grantor[]>(API_FINANCIAL_FEST + '/grantors');
  }

  getGrantor(id: number): Observable<Grantor | null> {
    return this.http.get<Grantor>(API_FINANCIAL_FEST + '/grantors/' + id);
  }

  public create(grantor: Grantor): Observable<Grantor> {
    return this.http.post<Grantor>(API_FINANCIAL_FEST + '/grantors', grantor);
  }

  public update(grantor: Grantor): Observable<Grantor> {
    return this.http.put<Grantor>(API_FINANCIAL_FEST + '/grantors/' + grantor.id, grantor);
  }
}
