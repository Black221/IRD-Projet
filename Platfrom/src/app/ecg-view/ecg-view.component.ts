import {Component, Input, OnInit} from '@angular/core';
import {Patient} from "../../models/patient.model";
import {PatientService} from "../../services/patient.service";
import {Ecg} from "../../models/ecg.model";

@Component({
  selector: 'app-ecg-view',
  templateUrl: './ecg-view.component.html',
  styleUrls: ['./ecg-view.component.css']
})
export class EcgViewComponent implements OnInit {

    // @ts-ignore
    @Input() ecg: Ecg;
    // @ts-ignore
    patient: Patient;

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {

      // @ts-ignore
      this.patient = this.patientService.getPatientById(this.ecg.patient.id)
  }

}
