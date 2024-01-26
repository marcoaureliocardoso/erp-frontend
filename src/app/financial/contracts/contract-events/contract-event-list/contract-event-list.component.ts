import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbHighlight, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { ContractEvent } from '../contract-event';
import { ContractEventSortableHeaderDirective, SortEvent } from '../contract-event-sortable-header.directive';
import { ContractEventService } from '../contract-event.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [RouterModule, AsyncPipe, DatePipe, FormsModule, NgbHighlight, NgbPaginationModule, ContractEventSortableHeaderDirective, NgClass, NgbTooltipModule],
  templateUrl: './contract-event-list.component.html',
  styleUrl: './contract-event-list.component.css',
  providers: [ContractEventService],
})
export class ContractEventListComponent implements OnInit {
  contractEvents$: Observable<ContractEvent[]>;
  total$: Observable<number>;

  @ViewChildren(ContractEventSortableHeaderDirective) headers!: QueryList<ContractEventSortableHeaderDirective>;

  public today: Date = new Date();

  constructor(public service: ContractEventService) {
    this.contractEvents$ = service.contractEvents$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    this.service.sortColumn = 'date';
    this.service.sortDirection = 'desc';
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

  public gtToday(date: Date): boolean {
    return date.setHours(0, 0, 0, 0) > this.today.setHours(0, 0, 0, 0);
  }

  public ltToday(date: Date): boolean {
    return date.setHours(0, 0, 0, 0) < this.today.setHours(0, 0, 0, 0);
  }

  public eqToday(date: Date): boolean {
    return date.setHours(0, 0, 0, 0) === this.today.setHours(0, 0, 0, 0);
  }

  public transformType(type: string): string {
    switch (type) {
      case 'beginDate':
        return '💼 Contratação';
      case 'recess1DeadlineAlertDate':
        return '🔔 Alerta de 1° Recesso';
      case 'recess1BeginDate':
        return '🏖️ Início do 1° Recesso';
      case 'recess1EndDate':
        return '🏖️ Fim do 1° Recesso';
      case 'report1DeadlineAlertDate':
        return '🔔 Alerta de 1° Relatório';
      case 'report1DeliveryDate':
        return '📝 1° Relatório';
      case 'recess2DeadlineAlertDate':
        return '🔔 Alerta de 2° Recesso';
      case 'recess2BeginDate':
        return '🏖️ Início do 2° Recesso';
      case 'recess2EndDate':
        return '🏖️ Fim do 2° Recesso';
      case 'report2DeadlineAlertDate':
        return '🔔 Alerta de 2° Relatório';
      case 'report2DeliveryDate':
        return '📝 2° Relatório';
      case 'endDeadlineAlertDate':
        return '🔔 Alerta de Fim de Contrato';
      case 'endDate':
        return '❌ Rescisão';
      default:
        return type;
    }
  }
}
