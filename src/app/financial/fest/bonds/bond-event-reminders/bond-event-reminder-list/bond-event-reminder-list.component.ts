import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbHighlight, NgbModal, NgbModalRef, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, pipe } from 'rxjs';

import { BondEventReminder } from '../bond-event-reminder';
import { BondEventReminderSortableHeaderDirective, SortEvent } from '../bond-event-reminder-sortable-header.directive';
import { BondEventReminderService } from '../bond-event-reminder.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [RouterModule, AsyncPipe, DatePipe, FormsModule, NgbHighlight, NgbPaginationModule, BondEventReminderSortableHeaderDirective, NgClass, NgbTooltipModule],
  templateUrl: './bond-event-reminder-list.component.html',
  styleUrl: './bond-event-reminder-list.component.css',
  providers: [BondEventReminderService],
})
export class BondEventListComponent implements OnInit {
  bondEventReminders$: Observable<BondEventReminder[]>;
  total$: Observable<number>;

  @ViewChildren(BondEventReminderSortableHeaderDirective) headers!: QueryList<BondEventReminderSortableHeaderDirective>;

  public today: Date = new Date(new Date().toDateString());

  private modal!: NgbModalRef;
  public currentNoteContent: string = '';
  private currentBondEventReminder!: BondEventReminder;

  constructor(public service: BondEventReminderService, public modalService: NgbModal) {
    this.bondEventReminders$ = service.bondEventReminders$;
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
      case 'BOND_END':
        return '❌ Rescisão';
      default:
        return type;
    }
  }

  public open(content: any, bondEventReminder: BondEventReminder) {
    if (bondEventReminder.note === null) {
      bondEventReminder.note = { id: bondEventReminder.id, content: '' };
    }

    this.currentNoteContent = bondEventReminder.note.content;

    this.currentBondEventReminder = bondEventReminder;

    this.modal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  public noteChange(textArea: EventTarget | null) {
    this.currentNoteContent = (<HTMLTextAreaElement>textArea!).value;
  }

  public close() {
    if (this.currentNoteContent !== this.currentBondEventReminder.note.content) {
      this.service.updateNoteContent(this.currentBondEventReminder, this.currentNoteContent).subscribe(
        pipe(() => {
          this.service.refresh();
        })
      );
    }

    this.modal.dismiss('Close click');
  }
}
