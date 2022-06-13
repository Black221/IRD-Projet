import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {EcgService} from "../../services/ecg.service";
import {DatasetService} from "../../services/dataset.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-specific-ecg',
  templateUrl: './specific-ecg.component.html',
  styleUrls: ['./specific-ecg.component.css']
})
export class SpecificEcgComponent implements OnInit {
    ecgNumber = "ECGId";
    patientNumber = "PatientId";
    recording = {
        start : "",
        end : ""
    };
    patient = {
        age: 15,
        height: "180",
        weight: "60",
        sex: "M"
    }
    created_at = "10/12/2021 10:15";
    last_update_at = "10/12/2021 10:15";
    filepath: any;
    filename: any;
    id = 0;
    constructor(private ecgService: EcgService,
                private route: ActivatedRoute) {
    }

  ngOnInit(): void {
      const id = this.route.snapshot.params['id'];
      this.id = id;
      // @ts-ignore
      this.ecgNumber= this.ecgService.getEcgtById(+id).number;
      // @ts-ignore
      this.patientNumber =this.ecgService.getEcgtById(+id).patientNumber ;
      // @ts-ignore
      this.recording = this.ecgService.getEcgtById(+id).recording;
      // @ts-ignore
      this.patient = this.ecgService.getEcgtById(+id).patient;
      // @ts-ignore
      this.created_at = this.ecgService.getEcgtById(+id).created_at;
      // @ts-ignore
      this.last_update_at = this.ecgService.getEcgtById(+id).last_update_at;
      // @ts-ignore
      this.filepath = this.ecgService.getEcgtById(+id).filepath;
      // @ts-ignore
      this.filename = this.ecgService.getEcgtById(+id).filename;

  }

}
