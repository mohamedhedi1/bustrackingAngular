import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationAddEditComponentComponent } from './station-add-edit-component.component';

describe('StationAddEditComponentComponent', () => {
  let component: StationAddEditComponentComponent;
  let fixture: ComponentFixture<StationAddEditComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StationAddEditComponentComponent]
    });
    fixture = TestBed.createComponent(StationAddEditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
