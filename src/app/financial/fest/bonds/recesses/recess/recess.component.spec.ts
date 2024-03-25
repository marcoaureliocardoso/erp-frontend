import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecessComponent } from './recess.component';

describe('RecessComponent', () => {
  let component: RecessComponent;
  let fixture: ComponentFixture<RecessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecessComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
