import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificStaffComponent } from './specific-staff.component';

describe('SpecificStaffComponent', () => {
  let component: SpecificStaffComponent;
  let fixture: ComponentFixture<SpecificStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
