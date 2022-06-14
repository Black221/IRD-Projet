import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificDatasetEcgComponent } from './specific-dataset-ecg.component';

describe('SpecificDatasetEcgComponent', () => {
  let component: SpecificDatasetEcgComponent;
  let fixture: ComponentFixture<SpecificDatasetEcgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificDatasetEcgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificDatasetEcgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
