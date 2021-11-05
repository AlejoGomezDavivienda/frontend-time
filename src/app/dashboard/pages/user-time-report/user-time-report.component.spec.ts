import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTimeReportComponent } from './user-time-report.component';

describe('UserTimeReportComponent', () => {
  let component: UserTimeReportComponent;
  let fixture: ComponentFixture<UserTimeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTimeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTimeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
