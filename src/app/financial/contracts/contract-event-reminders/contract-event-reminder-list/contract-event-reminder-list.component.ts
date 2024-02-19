import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbHighlight, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { ContractEventReminder } from '../contract-event-reminder';
import { ContractEventReminderService } from '../contract-event-reminder.service';
import { ContractEventReminderSortableHeaderDirective, SortEvent } from '../contract-event-reminder-sortable-header.directive';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [RouterModule, AsyncPipe, DatePipe, FormsModule, NgbHighlight, NgbPaginationModule, ContractEventReminderSortableHeaderDirective, NgClass, NgbTooltipModule],
  templateUrl: './contract-event-reminder-list.component.html',
  styleUrl: './contract-event-reminder-list.component.css',
  providers: [ContractEventReminderService],
})
export class ContractEventListComponent implements OnInit {
  contractEventReminders$: Observable<ContractEventReminder[]>;
  total$: Observable<number>;

  @ViewChildren(ContractEventReminderSortableHeaderDirective) headers!: QueryList<ContractEventReminderSortableHeaderDirective>;

  public today: Date = new Date(new Date().toDateString());

  constructor(public service: ContractEventReminderService) {
    this.contractEventReminders$ = service.contractEventReminders$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    this.service.sortColumn = 'eventReminderDate';
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
    const normDate: Date = new Date(new Date(date).toDateString());
    return normDate > this.today;
  }

  public ltToday(date: Date): boolean {
    const normDate: Date = new Date(new Date(date).toDateString());
    return normDate < this.today;
  }

  public eqToday(date: Date): boolean {
    const normDate: Date = new Date(new Date(date).toDateString());
    return normDate === this.today;
  }

  public transformType(type: string): string {
    switch (type) {
      // case 'startDate':
      //   return '💼 Contratação';
      case 'RECESS1':
        return '🏖️ 1° Recesso';
      case 'REPORT1_DELIVERY':
        return '📝 1° Relatório';
      case 'RECESS2':
        return '🏖️ 2° Recesso';
      case 'REPORT2_DELIVERY':
        return '📝 2° Relatório';
      case 'CONTRACT_END':
        return '❌ Rescisão';
      default:
        return type;
    }
  }
}
