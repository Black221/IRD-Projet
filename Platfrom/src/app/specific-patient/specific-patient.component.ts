import {Component, Input, OnInit} from '@angular/core';
import {Patient} from "../../models/patient.model";
import {EcgService} from "../../services/ecg.service";
import {ActivatedRoute} from "@angular/router";
import {PatientService} from "../../services/patient.service";

@Component({
  selector: 'app-specific-patient',
  templateUrl: './specific-patient.component.html',
  styleUrls: ['./specific-patient.component.css']
})
export class SpecificPatientComponent implements OnInit {
    // @ts-ignore
    patient: Patient;
    // @ts-ignore
    @Input() id: number;
    @Input() link = "/platform/patient";

    constructor(private patientService: PatientService,
              private route: ActivatedRoute) { }

    ngOnInit(): void {
        const id = this.route.snapshot.params['id'];
        // @ts-ignore
        this.patient = this.patientService.getPatientById(+id);
    }

}
