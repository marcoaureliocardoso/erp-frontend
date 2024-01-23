import { DecimalPipe } from '@angular/common';
import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, Subject, debounceTime, of, switchMap, tap } from 'rxjs';

import { Contract } from './contract';
import { SortColumn, SortDirection } from './contract-sortable-header.directive';
import { CONTRACTS } from './contracts';

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

const compare = (v1: string | number | Date, v2: string | number | Date) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(contracts: Contract[], column: SortColumn, direction: string): Contract[] {
  if (direction === '' || column === '') {
    return contracts;
  } else {
    return [...contracts].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(contract: Contract, term: string, pipe: PipeTransform) {
  return (
    contract.grantorName.toLowerCase().includes(term.toLowerCase()) ||
    contract.projectName.toLowerCase().includes(term.toLowerCase()) ||
    contract.courseName.toLowerCase().includes(term.toLowerCase()) ||
    contract.employeeGivenName.toLowerCase().includes(term.toLowerCase())
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

  constructor(private pipe: DecimalPipe) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        // delay(200),
        tap(() => this._loading$.next(false))
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
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // 1. sort
    let contracts = sort(CONTRACTS, sortColumn, sortDirection);

    // 2. filter
    contracts = contracts.filter((contract) => matches(contract, searchTerm, this.pipe));
    const total = contracts.length;

    // 3. paginate
    contracts = contracts.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ contracts, total });
  }
}
