import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitAddEditComponentComponent } from './circuit-add-edit-component.component';

describe('CircuitAddEditComponentComponent', () => {
  let component: CircuitAddEditComponentComponent;
  let fixture: ComponentFixture<CircuitAddEditComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CircuitAddEditComponentComponent]
    });
    fixture = TestBed.createComponent(CircuitAddEditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
