import {Component, Input, OnInit} from '@angular/core';
import {Patient} from "../../models/patient.model";

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.css']
})
export class PatientViewComponent implements OnInit {

    // @ts-ignore
    @Input() patient: Patient;

  constructor() { }

  ngOnInit(): void {
  }

}
