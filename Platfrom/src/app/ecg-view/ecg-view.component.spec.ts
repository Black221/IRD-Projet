import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcgViewComponent } from './ecg-view.component';

describe('EcgViewComponent', () => {
  let component: EcgViewComponent;
  let fixture: ComponentFixture<EcgViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcgViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcgViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
