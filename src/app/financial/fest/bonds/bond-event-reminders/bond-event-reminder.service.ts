import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, debounceTime, switchMap, tap } from 'rxjs';

import { API_FINANCIAL_FEST } from '../../../../shared/api';
import { Bond } from '../bond';
import { BondEventNote, BondEventReminder } from './bond-event-reminder';
import { SortColumn, SortDirection } from './bond-event-reminder-sortable-header.directive';

interface SearchResult {
  bondEventReminders: BondEventReminder[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number | Date | boolean | Bond | BondEventNote, v2: string | number | Date | boolean | Bond | BondEventNote) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(bondEventReminders: BondEventReminder[], column: SortColumn, direction: string): BondEventReminder[] {
  if (direction === '' || column === '') {
    return bondEventReminders;
  } else {
    switch (column) {
      case 'bond.employee.surname':
        return [...bondEventReminders].sort((a, b) => {
          const res = compare(a.bond.employee.surname, b.bond.employee.surname);
          return direction === 'asc' ? res : -res;
        });
      case 'bond.employee.givenName':
        return [...bondEventReminders].sort((a, b) => {
          const res = compare(a.bond.employee.givenName, b.bond.employee.givenName);
          return direction === 'asc' ? res : -res;
        });
      default:
        return [...bondEventReminders].sort((a, b) => {
          const res = compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
        });
    }
  }
}

function matches(bondEventReminder: BondEventReminder, term: string) {
  return (
    bondEventReminder.bond.employee.givenName.toLowerCase().includes(term.toLowerCase()) ||
    bondEventReminder.bond.employee.surname.toLowerCase().includes(term.toLowerCase()) ||
    bondEventReminder.eventType.toLowerCase().includes(term.toLowerCase())
  );
}

@Injectable({
  providedIn: 'root',
})
export class BondEventReminderService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _bondEventReminders$ = new BehaviorSubject<BondEventReminder[]>([]);
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
        this._bondEventReminders$.next(result.bondEventReminders);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get bondEventReminders$() {
    return this._bondEventReminders$.asObservable();
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
      this.http.get<BondEventReminder[]>(API_FINANCIAL_FEST + '/bond-event-reminders').subscribe({
        next: (data) => {
          const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

          // 1. sort
          let bondEventReminders = sort(data, sortColumn, sortDirection);

          // 2. filter
          bondEventReminders = bondEventReminders.filter((bondEventReminder) => matches(bondEventReminder, searchTerm));
          const total = bondEventReminders.length;

          // 3. paginate
          bondEventReminders = bondEventReminders.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
          observer.next({ bondEventReminders: bondEventReminders, total });
        },
        error: (error) => observer.error(error),
        complete: () => observer.complete(),
      });
    });
  }

  public updateNoteContent(bondEventReminder: BondEventReminder, noteContent: string): Observable<BondEventReminder> {
    bondEventReminder.note.content = noteContent;
    return this.http.put<BondEventReminder>(API_FINANCIAL_FEST + '/bond-event-reminders/' + bondEventReminder.id + '/note', bondEventReminder);
  }

  public refresh() {
    this._search$.next();
  }
}
