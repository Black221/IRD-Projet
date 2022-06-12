import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificDatasetComponent } from './specific-dataset.component';

describe('SpecificDatasetComponent', () => {
  let component: SpecificDatasetComponent;
  let fixture: ComponentFixture<SpecificDatasetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificDatasetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificDatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
