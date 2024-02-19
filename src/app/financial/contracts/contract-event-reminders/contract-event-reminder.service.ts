import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, debounceTime, switchMap, tap } from 'rxjs';

import { FINANCIAL_API } from '../../../shared/api';
import { Contract } from '../contract';
import { ContractEventNote, ContractEventReminder } from './contract-event-reminder';
import { SortColumn, SortDirection } from './contract-event-reminder-sortable-header.directive';

interface SearchResult {
  contractEventReminders: ContractEventReminder[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number | Date | boolean | Contract | ContractEventNote, v2: string | number | Date | boolean | Contract | ContractEventNote) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(contractEventReminders: ContractEventReminder[], column: SortColumn, direction: string): ContractEventReminder[] {
  if (direction === '' || column === '') {
    return contractEventReminders;
  } else {
    switch (column) {
      case 'contract.employee.surname':
        return [...contractEventReminders].sort((a, b) => {
          const res = compare(a.contract.employee.surname, b.contract.employee.surname);
          return direction === 'asc' ? res : -res;
        });
      case 'contract.employee.givenName':
        return [...contractEventReminders].sort((a, b) => {
          const res = compare(a.contract.employee.givenName, b.contract.employee.givenName);
          return direction === 'asc' ? res : -res;
        });
      default:
        return [...contractEventReminders].sort((a, b) => {
          const res = compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
        });
    }
  }
}

function matches(contractEventReminder: ContractEventReminder, term: string) {
  return (
    contractEventReminder.contract.employee.givenName.toLowerCase().includes(term.toLowerCase()) ||
    contractEventReminder.contract.employee.surname.toLowerCase().includes(term.toLowerCase()) ||
    contractEventReminder.eventType.toLowerCase().includes(term.toLowerCase())
  );
}

@Injectable({
  providedIn: 'root',
})
export class ContractEventReminderService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _contractEventReminders$ = new BehaviorSubject<ContractEventReminder[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 15,
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
        this._contractEventReminders$.next(result.contractEventReminders);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get contractEventReminders$() {
    return this._contractEventReminders$.asObservable();
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
    return new Observable((observer) => {
      this.http.get<ContractEventReminder[]>(FINANCIAL_API + '/contract-event-reminders').subscribe({
        next: (data) => {
          const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

          // 1. sort
          let contractEventReminders = sort(data, sortColumn, sortDirection);

          // 2. filter
          contractEventReminders = contractEventReminders.filter((contractEventReminder) => matches(contractEventReminder, searchTerm));
          const total = contractEventReminders.length;

          // 3. paginate
          contractEventReminders = contractEventReminders.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
          observer.next({ contractEventReminders, total });
        },
        error: (error) => observer.error(error),
        complete: () => observer.complete(),
      });
    });
  }
}
