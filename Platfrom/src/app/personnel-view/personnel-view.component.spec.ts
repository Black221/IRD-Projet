import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinViewComponent } from './personnel-view.component';

describe('MedecinViewComponent', () => {
  let component: MedecinViewComponent;
  let fixture: ComponentFixture<MedecinViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedecinViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedecinViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
