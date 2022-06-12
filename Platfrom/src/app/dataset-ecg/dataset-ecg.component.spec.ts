import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetEcgComponent } from './dataset-ecg.component';

describe('DatasetEcgComponent', () => {
  let component: DatasetEcgComponent;
  let fixture: ComponentFixture<DatasetEcgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetEcgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatasetEcgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
