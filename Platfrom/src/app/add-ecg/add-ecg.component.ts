import {Component, OnInit} from '@angular/core';
import {EcgService} from "../../services/ecg.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {DatasetService} from "../../services/dataset.service";

@Component({
  selector: 'app-add-ecg',
  templateUrl: './add-ecg.component.html',
  styleUrls: ['./add-ecg.component.css']
})
export class AddEcgComponent implements OnInit {
    add = true;

    ecgNumber = "";
    patientNumber = "";
    recording = {
        start : "",
        end : ""
    };
    patient = {
        age: "",
        height: "",
        weight: "",
        sex: ""
    }
    created_at = "";
    last_update_at = "";
    filepath: any;
    filename: any;
    id = 0;
    dataset: any;
    datasets: any[] | undefined;
    datasetSubscription: Subscription | undefined;

    constructor(private ecgService: EcgService,
                private datasetService: DatasetService,
                private route: ActivatedRoute) {
    }


    ngOnInit(): void {
        const id = this.route.snapshot.params['id'];
        if (id) {
            this.add = false;
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
        this.datasetSubscription = this.datasetService.datasetSubject.subscribe(
            (datasets: any[]) => {
                this.datasets = datasets;
            }
        );
        this.datasetService.emitDatasetSubject();
    }
}
