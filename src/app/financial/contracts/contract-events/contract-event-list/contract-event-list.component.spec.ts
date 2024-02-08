import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractEventListComponent } from './contract-event-list.component';

describe('ContractEventListComponent', () => {
  let component: ContractEventListComponent;
  let fixture: ComponentFixture<ContractEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractEventListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContractEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
