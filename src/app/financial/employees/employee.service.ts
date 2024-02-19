import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, debounceTime, switchMap, tap } from 'rxjs';

import { FINANCIAL_API } from '../../shared/api';
import { Employee } from './employee';
import { SortColumn, SortDirection } from './employee-sortable-header.directive';

interface SearchResult {
  employees: Employee[];
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

function sort(employees: Employee[], column: SortColumn, direction: string): Employee[] {
  if (direction === '' || column === '') {
    return employees;
  } else {
    return [...employees].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(employee: Employee, term: string) {
  return (
    employee.givenName.toLowerCase().includes(term.toLowerCase()) ||
    employee.surname.toLowerCase().includes(term.toLowerCase()) ||
    employee.identityNumber.toLowerCase().includes(term.toLowerCase()) ||
    employee.email.toLowerCase().includes(term.toLowerCase())
  );
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _employees$ = new BehaviorSubject<Employee[]>([]);
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
        this._employees$.next(result.employees);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get employees$() {
    return this._employees$.asObservable();
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
      this.http.get<Employee[]>(FINANCIAL_API + '/employees').subscribe({
        next: (data) => {
          const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

          // 1. sort
          let employees = sort(data, sortColumn, sortDirection);

          // 2. filter
          employees = employees.filter((employee) => matches(employee, searchTerm));
          const total = employees.length;

          // 3. paginate
          employees = employees.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

          observer.next({ employees, total });
        },
        error: (error) => observer.error(error),
        complete: () => observer.complete(),
      });
    });
  }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(FINANCIAL_API + '/employees');
  }

  public getEmployee(id: number): Observable<Employee | undefined> {
    return this.http.get<Employee>(FINANCIAL_API + '/employees/' + id);
  }

  public create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(FINANCIAL_API + '/employees', employee);
  }

  public update(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(FINANCIAL_API + '/employees/' + employee.id, employee);
  }
}
