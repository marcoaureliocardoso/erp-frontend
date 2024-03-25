import { AsyncPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbHighlight, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { Employee } from '../employee';
import { EmployeeSortableHeaderDirective, SortEvent } from '../employee-sortable-header.directive';
import { EmployeeService } from '../employee.service';
import { CpfFormatPipe } from '../../../../shared/cpf-format.pipe';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterModule, AsyncPipe, FormsModule, NgbHighlight, NgbPaginationModule, EmployeeSortableHeaderDirective, CpfFormatPipe, NgbTooltipModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
  providers: [EmployeeService],
})
export class EmployeeListComponent {
  employees$: Observable<Employee[]>;
  total$: Observable<number>;

  @ViewChildren(EmployeeSortableHeaderDirective) headers!: QueryList<EmployeeSortableHeaderDirective>;

  constructor(public service: EmployeeService) {
    this.employees$ = service.employees$;
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
