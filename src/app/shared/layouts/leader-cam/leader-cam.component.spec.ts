import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderCamComponent } from './leader-cam.component';

describe('LeaderCamComponent', () => {
  let component: LeaderCamComponent;
  let fixture: ComponentFixture<LeaderCamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderCamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderCamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
