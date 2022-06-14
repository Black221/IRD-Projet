import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificPatientComponent } from './specific-patient.component';

describe('SpecificPatientComponent', () => {
  let component: SpecificPatientComponent;
  let fixture: ComponentFixture<SpecificPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
