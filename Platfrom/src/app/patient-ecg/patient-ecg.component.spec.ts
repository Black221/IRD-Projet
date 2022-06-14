import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEcgComponent } from './patient-ecg.component';

describe('PatientEcgComponent', () => {
  let component: PatientEcgComponent;
  let fixture: ComponentFixture<PatientEcgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientEcgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientEcgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
