import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRegisterDialogComponent } from './new-register-dialog.component';

describe('NewRegisterDialogComponent', () => {
  let component: NewRegisterDialogComponent;
  let fixture: ComponentFixture<NewRegisterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRegisterDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
