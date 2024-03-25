import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondEditComponent } from './bond-edit.component';

describe('BondEditComponent', () => {
  let component: BondEditComponent;
  let fixture: ComponentFixture<BondEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BondEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BondEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
