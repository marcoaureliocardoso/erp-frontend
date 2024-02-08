import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecessEditComponent } from './recess-edit.component';

describe('RecessEditComponent', () => {
  let component: RecessEditComponent;
  let fixture: ComponentFixture<RecessEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecessEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecessEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
