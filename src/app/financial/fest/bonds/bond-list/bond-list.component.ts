import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbHighlight, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { Bond } from '../bond';
import { BondSortableHeaderDirective, SortEvent } from '../bond-sortable-header.directive';
import { BondService } from '../bond.service';
import { ShortPipe } from '../../../../shared/short.pipe';

@Component({
  selector: 'app-bond-list',
  standalone: true,
  imports: [RouterModule, DatePipe, FormsModule, AsyncPipe, NgbHighlight, BondSortableHeaderDirective, NgbPaginationModule, ShortPipe, NgbTooltipModule],
  templateUrl: './bond-list.component.html',
  styleUrl: './bond-list.component.css',
  providers: [BondService],
})
export class BondListComponent {
  bonds$: Observable<Bond[]>;
  total$: Observable<number>;

  @ViewChildren(BondSortableHeaderDirective) headers!: QueryList<BondSortableHeaderDirective>;

  constructor(public service: BondService) {
    this.bonds$ = service.bonds$;
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
