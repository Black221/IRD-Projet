import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {DatasetService} from "../../services/dataset.service";
import {EcgService} from "../../services/ecg.service";

@Component({
  selector: 'app-dataset-ecg',
  templateUrl: './dataset-ecg.component.html',
  styleUrls: ['./dataset-ecg.component.css']
})
export class DatasetEcgComponent implements OnInit {
    datasets: any[] | undefined;
    datasetSubscription: Subscription | undefined;
    ecgs: any[] | undefined;
    ecgCount = 0;
    ecgSubscription: Subscription | undefined;

    constructor(private datasetService: DatasetService,
                private ecgService: EcgService) {
    }

    ngOnInit () {
        this.datasetSubscription = this.datasetService.datasetSubject.subscribe(
            (datasets: any[]) => {
                this.datasets = datasets;
            }
        );
        this.datasetService.emitDatasetSubject();
        this.ecgSubscription = this.ecgService.ecgSubject.subscribe(
            (ecgs: any[]) => {
                this.ecgs = ecgs;
            }
        );
        // @ts-ignore
        this.ecgService.emitEcgSubject();
    }
}
