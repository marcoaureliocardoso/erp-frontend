import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractEventEditComponent } from './contract-event-edit.component';

describe('ContractEventEditComponent', () => {
  let component: ContractEventEditComponent;
  let fixture: ComponentFixture<ContractEventEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractEventEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractEventEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
