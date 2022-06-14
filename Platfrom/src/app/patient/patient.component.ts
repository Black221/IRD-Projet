import { Component, OnInit } from '@angular/core';
import {Patient} from "../../models/patient.model";
import {Subscription} from "rxjs";
import {PatientService} from "../../services/patient.service";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})

export class PatientComponent implements OnInit {

    // @ts-ignore
    patients: Patient[];
    // @ts-ignore
    patientSubscription: Subscription;

    constructor(private patientService: PatientService) {

    }

    ngOnInit () {
        this.patientSubscription = this.patientService.patientSubject.subscribe(
            (patients: Patient[]) => {
                this.patients = patients;
            }
        );
        this.patientService.emitPatientSubject();
    }
}
