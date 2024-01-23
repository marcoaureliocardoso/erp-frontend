import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbHighlight, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { Contract } from '../contract';
import { ContractSortableHeaderDirective, SortEvent } from '../contract-sortable-header.directive';
import { ContractService } from '../contract.service';
import { ShortPipe } from '../../../shared/short.pipe';

@Component({
  selector: 'app-contract-list',
  standalone: true,
  imports: [RouterModule, DecimalPipe, DatePipe, FormsModule, AsyncPipe, NgbHighlight, ContractSortableHeaderDirective, NgbPaginationModule, ShortPipe, NgbTooltipModule],
  templateUrl: './contract-list.component.html',
  styleUrl: './contract-list.component.css',
  providers: [ContractService, DecimalPipe],
})
export class ContractListComponent {
  contracts$: Observable<Contract[]>;
  total$: Observable<number>;

  @ViewChildren(ContractSortableHeaderDirective) headers!: QueryList<ContractSortableHeaderDirective>;

  constructor(public service: ContractService) {
    this.contracts$ = service.contracts$;
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
