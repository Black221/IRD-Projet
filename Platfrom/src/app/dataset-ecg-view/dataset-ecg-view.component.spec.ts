import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetEcgViewComponent } from './dataset-ecg-view.component';

describe('DatasetEcgViewComponent', () => {
  let component: DatasetEcgViewComponent;
  let fixture: ComponentFixture<DatasetEcgViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetEcgViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatasetEcgViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
