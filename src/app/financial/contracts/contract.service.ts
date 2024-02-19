import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, debounceTime, switchMap, tap } from 'rxjs';

import { FINANCIAL_API } from '../../shared/api';
import { Course } from '../courses/course';
import { Employee } from '../employees/employee';
import { Grantor } from '../projects/grantors/grantor';
import { Project } from '../projects/project';
import { Contract } from './contract';
import { SortColumn, SortDirection } from './contract-sortable-header.directive';

interface SearchResult {
  contracts: Contract[];
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

function sort(contracts: Contract[], column: SortColumn, direction: string): Contract[] {
  if (direction === '' || column === '') {
    return contracts;
  } else {
    switch (column) {
      case 'project.grantor.name':
        return [...contracts].sort((a, b) => {
          const res = compare(a.project.grantor.name, b.project.grantor.name);
          return direction === 'asc' ? res : -res;
        });
      case 'project.name':
        return [...contracts].sort((a, b) => {
          const res = compare(a.project.name, b.project.name);
          return direction === 'asc' ? res : -res;
        });
      case 'course.name':
        return [...contracts].sort((a, b) => {
          const res = compare(a.course.name, b.course.name);
          return direction === 'asc' ? res : -res;
        });
      case 'employee.givenName':
        return [...contracts].sort((a, b) => {
          const res = compare(a.employee.givenName, b.employee.givenName);
          return direction === 'asc' ? res : -res;
        });
      case 'employee.surname':
        return [...contracts].sort((a, b) => {
          const res = compare(a.employee.surname, b.employee.surname);
          return direction === 'asc' ? res : -res;
        });
      default:
        return [...contracts].sort((a, b) => {
          const res = compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
        });
    }
  }
}

function matches(contract: Contract, term: string) {
  return (
    contract.project.grantor.name.toLowerCase().includes(term.toLowerCase()) ||
    contract.project.name.toLowerCase().includes(term.toLowerCase()) ||
    contract.course.name.toLowerCase().includes(term.toLowerCase()) ||
    contract.employee.givenName.toLowerCase().includes(term.toLowerCase()) ||
    contract.employee.surname.toLowerCase().includes(term.toLowerCase())
  );
}

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _contracts$ = new BehaviorSubject<Contract[]>([]);
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
        this._contracts$.next(result.contracts);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get contracts$() {
    return this._contracts$.asObservable();
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
      this.http.get<Contract[]>(FINANCIAL_API + '/contracts').subscribe({
        next: (data) => {
          const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

          // 1. sort
          let contracts = sort(data, sortColumn, sortDirection);

          // 2. filter
          contracts = contracts.filter((contract) => matches(contract, searchTerm));
          const total = contracts.length;

          // 3. paginate
          contracts = contracts.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

          observer.next({ contracts, total });
        },
        error: (error) => observer.error(error),
        complete: () => observer.complete(),
      });
    });
  }

  public getContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(FINANCIAL_API + '/contracts');
  }

  public getContract(id: number): Observable<Contract | undefined> {
    return this.http.get<Contract>(FINANCIAL_API + '/contracts/' + id);
  }

  public create(contract: Contract): Observable<Contract> {
    return this.http.post<Contract>(FINANCIAL_API + '/contracts', contract);
  }

  public update(contract: Contract): Observable<Contract> {
    return this.http.put<Contract>(FINANCIAL_API + '/contracts/' + contract.id, contract);
  }
}
