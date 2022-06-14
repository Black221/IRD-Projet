import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {DatasetService} from "../../services/dataset.service";
import {Dataset} from "../../models/dataset.model";

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.css']
})
export class DatasetComponent implements OnInit {

    datasets: Dataset[] | undefined;
    datasetSubscription: Subscription | undefined;
    previous: any;
    next: any;

    constructor(private datasetService: DatasetService) {

    }

    ngOnInit () {
        this.datasetSubscription = this.datasetService.datasetSubject.subscribe(
            (datasets: Dataset[]) => {
                this.datasets = datasets;
            }
        );
        this.datasetService.emitDatasetSubject();
    }
}
