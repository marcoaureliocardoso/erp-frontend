import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbHighlight, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { Grantor } from '../grantor';
import { GrantorSortableHeaderDirective, SortEvent } from '../grantor-sortable-header.directive';
import { GrantorService } from '../grantor.service';

@Component({
  selector: 'app-grantor-list',
  standalone: true,
  imports: [RouterModule, AsyncPipe, DatePipe, FormsModule, NgbHighlight, NgbPaginationModule, GrantorSortableHeaderDirective, NgbTooltipModule],
  templateUrl: './grantor-list.component.html',
  styleUrl: './grantor-list.component.css',
  providers: [GrantorService, DecimalPipe],
})
export class GrantorListComponent {
  grantors$: Observable<Grantor[]>;
  total$: Observable<number>;

  @ViewChildren(GrantorSortableHeaderDirective) headers!: QueryList<GrantorSortableHeaderDirective>;

  constructor(public service: GrantorService) {
    this.grantors$ = service.grantors$;
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
