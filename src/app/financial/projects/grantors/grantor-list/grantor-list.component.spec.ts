import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantorListComponent } from './grantor-list.component';

describe('GrantorListComponent', () => {
  let component: GrantorListComponent;
  let fixture: ComponentFixture<GrantorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrantorListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GrantorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
