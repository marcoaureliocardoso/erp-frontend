import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbHighlight, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { Project } from '../project';
import { ProjectSortableHeaderDirective, SortEvent } from '../project-sortable-header.directive';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [RouterModule, AsyncPipe, DatePipe, FormsModule, NgbHighlight, NgbPaginationModule, ProjectSortableHeaderDirective, NgbTooltipModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
  providers: [ProjectService],
})
export class ProjectListComponent {
  projects$: Observable<Project[]>;
  total$: Observable<number>;

  @ViewChildren(ProjectSortableHeaderDirective) headers!: QueryList<ProjectSortableHeaderDirective>;

  constructor(public service: ProjectService) {
    this.projects$ = service.projects$;
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
