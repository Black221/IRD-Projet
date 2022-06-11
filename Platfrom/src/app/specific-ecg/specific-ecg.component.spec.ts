import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificEcgComponent } from './specific-ecg.component';

describe('SpecificEcgComponent', () => {
  let component: SpecificEcgComponent;
  let fixture: ComponentFixture<SpecificEcgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificEcgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificEcgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
