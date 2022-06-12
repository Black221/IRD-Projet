import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {DatasetService} from "../../services/dataset.service";

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.css']
})
export class DatasetComponent implements OnInit {

    datasets: any[] | undefined;
    datasetSubscription: Subscription | undefined;

    constructor(private datasetService: DatasetService) {

    }

    ngOnInit () {
        this.datasetSubscription = this.datasetService.datasetSubject.subscribe(
            (datasets: any[]) => {
                this.datasets = datasets;
            }
        );
        this.datasetService.emitDatasetSubject();
    }
}
