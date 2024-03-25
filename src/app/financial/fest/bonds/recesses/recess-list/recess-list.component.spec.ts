import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecessListComponent } from './recess-list.component';

describe('RecessListComponent', () => {
  let component: RecessListComponent;
  let fixture: ComponentFixture<RecessListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecessListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
