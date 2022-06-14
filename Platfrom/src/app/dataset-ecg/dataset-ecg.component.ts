import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {DatasetService} from "../../services/dataset.service";
import {EcgService} from "../../services/ecg.service";
import {Ecg} from "../../models/ecg.model";
import {Dataset} from "../../models/dataset.model";

@Component({
  selector: 'app-dataset-ecg',
  templateUrl: './dataset-ecg.component.html',
  styleUrls: ['./dataset-ecg.component.css']
})
export class DatasetEcgComponent implements OnInit {
    datasets: Dataset[] | undefined;
    datasetSubscription: Subscription | undefined;
    ecgs: Ecg[] | undefined;
    ecgSubscription: Subscription | undefined;

    constructor(private datasetService: DatasetService,
                private ecgService: EcgService) {
    }

    ngOnInit () {
        this.datasetSubscription = this.datasetService.datasetSubject.subscribe(
            (datasets: Dataset[]) => {
                this.datasets = datasets;
            }
        );
        this.datasetService.emitDatasetSubject();
        this.ecgSubscription = this.ecgService.ecgSubject.subscribe(
            (ecgs: Ecg[]) => {
                this.ecgs = ecgs;
            }
        );
        // @ts-ignore
        this.ecgService.emitEcgSubject();
    }
}
