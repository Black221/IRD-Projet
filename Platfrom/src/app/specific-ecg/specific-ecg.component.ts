import {Component, Input, OnInit} from '@angular/core';
import {EcgService} from "../../services/ecg.service";
import {ActivatedRoute} from "@angular/router";
import {Ecg} from "../../models/ecg.model";
import {Patient} from "../../models/patient.model";
import {PatientService} from "../../services/patient.service";

@Component({
  selector: 'app-specific-ecg',
  templateUrl: './specific-ecg.component.html',
  styleUrls: ['./specific-ecg.component.css']
})
export class SpecificEcgComponent implements OnInit {

    @Input() link = "/platform/ecg";
    // @ts-ignore
    ecg: Ecg;
    // @ts-ignore
    patient: Patient;
    constructor(private ecgService: EcgService,
                private patientService: PatientService,
                private route: ActivatedRoute) {
    }

  ngOnInit(): void {
      const id = this.route.snapshot.params['id'];
      // @ts-ignore
      this.ecg = this.ecgService.getEcgtById(+id);
      // @ts-ignore
      this.patient = this.patientService.getPatientById(+this.ecg.patient.id);
  }

}
