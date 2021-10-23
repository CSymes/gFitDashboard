import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsWidgetComponent } from './steps.component';

describe('StepsComponent', () => {
  let component: StepsWidgetComponent;
  let fixture: ComponentFixture<StepsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
