import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAuditorComponent } from './edit-auditor.component';

describe('EditAuditorComponent', () => {
  let component: EditAuditorComponent;
  let fixture: ComponentFixture<EditAuditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAuditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAuditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
