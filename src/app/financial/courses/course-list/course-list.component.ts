import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbHighlight, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { Course } from '../course';
import { CourseSortableHeaderDirective, SortEvent } from '../course-sortable-header.directive';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [RouterModule, AsyncPipe, DatePipe, FormsModule, NgbHighlight, NgbPaginationModule, CourseSortableHeaderDirective, NgbTooltipModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
  providers: [CourseService],
})
export class CourseListComponent {
  courses$: Observable<Course[]>;
  total$: Observable<number>;

  @ViewChildren(CourseSortableHeaderDirective) headers!: QueryList<CourseSortableHeaderDirective>;

  constructor(public service: CourseService) {
    this.courses$ = service.courses$;
    this.total$ = service.total$;
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
