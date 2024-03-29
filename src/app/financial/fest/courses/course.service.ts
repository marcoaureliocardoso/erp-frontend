import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, debounceTime, switchMap, tap } from 'rxjs';

import { API_FINANCIAL_FEST } from '../../../shared/api';
import { Course } from './course';
import { SortColumn, SortDirection } from './course-sortable-header.directive';

interface SearchResult {
  courses: Course[];
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

function sort(courses: Course[], column: SortColumn, direction: string): Course[] {
  if (direction === '' || column === '') {
    return courses;
  } else {
    return [...courses].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(course: Course, term: string) {
  return course.name.toLowerCase().includes(term.toLowerCase());
}

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _courses$ = new BehaviorSubject<Course[]>([]);
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
        this._courses$.next(result.courses);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get courses$() {
    return this._courses$.asObservable();
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
      this.http.get<Course[]>(API_FINANCIAL_FEST + '/courses').subscribe({
        next: (data) => {
          const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

          // 1. sort
          let courses = sort(data, sortColumn, sortDirection);

          // 2. filter
          courses = courses.filter((course) => matches(course, searchTerm));
          const total = courses.length;

          // 3. paginate
          courses = courses.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

          observer.next({ courses, total });
        },
        error: (error) => observer.error(error),
        complete: () => observer.complete(),
      });
    });
  }

  public getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(API_FINANCIAL_FEST + '/courses');
  }

  public getCourse(id: number): Observable<Course | null> {
    return this.http.get<Course>(API_FINANCIAL_FEST + '/courses/' + id);
  }

  public create(course: Course): Observable<Course> {
    return this.http.post<Course>(API_FINANCIAL_FEST + '/courses', course);
  }

  public update(course: Course): Observable<Course> {
    return this.http.put<Course>(API_FINANCIAL_FEST + '/courses/' + course.id, course);
  }
}
