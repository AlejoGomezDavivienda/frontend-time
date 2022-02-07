import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGraphsComponent } from './show-graphs.component';

describe('ShowGraphsComponent', () => {
  let component: ShowGraphsComponent;
  let fixture: ComponentFixture<ShowGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowGraphsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
