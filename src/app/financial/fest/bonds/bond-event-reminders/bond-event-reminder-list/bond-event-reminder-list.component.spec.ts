import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondEventListComponent } from './bond-event-reminder-list.component';

describe('BondEventListComponent', () => {
  let component: BondEventListComponent;
  let fixture: ComponentFixture<BondEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BondEventListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BondEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
