import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, debounceTime, of, switchMap, tap } from 'rxjs';

import { ContractEvent } from './contract-event';
import { SortColumn, SortDirection } from './contract-event-sortable-header.directive';
import { CONTRACT_EVENTS } from './contract-events';

interface SearchResult {
  contractEvents: ContractEvent[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number | Date | boolean, v2: string | number | Date | boolean) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(contractEvents: ContractEvent[], column: SortColumn, direction: string): ContractEvent[] {
  if (direction === '' || column === '') {
    return contractEvents;
  } else {
    return [...contractEvents].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(contractEvent: ContractEvent, term: string) {
  return (
    contractEvent.employeeGivenName.toLowerCase().includes(term.toLowerCase()) ||
    contractEvent.employeeSurname.toLowerCase().includes(term.toLowerCase()) ||
    contractEvent.type.toLowerCase().includes(term.toLowerCase())
  );
}

@Injectable({
  providedIn: 'root',
})
export class ContractEventService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _contractEvents$ = new BehaviorSubject<ContractEvent[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 15,
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
        tap(() => this._loading$.next(false)),
      )
      .subscribe((result) => {
        this._contractEvents$.next(result.contractEvents);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get contractEvents$() {
    return this._contractEvents$.asObservable();
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
    let contractEvents = sort(CONTRACT_EVENTS, sortColumn, sortDirection);

    // 2. filter
    contractEvents = contractEvents.filter((contractEvent) => matches(contractEvent, searchTerm));
    const total = contractEvents.length;

    // 3. paginate
    contractEvents = contractEvents.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ contractEvents, total });
  }
}
