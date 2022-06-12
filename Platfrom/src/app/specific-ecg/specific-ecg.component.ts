import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
