import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantorEditComponent } from './grantor-edit.component';

describe('GrantorEditComponent', () => {
  let component: GrantorEditComponent;
  let fixture: ComponentFixture<GrantorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrantorEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GrantorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
