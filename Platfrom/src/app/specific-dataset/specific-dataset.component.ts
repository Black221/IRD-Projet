import {Component, Input, OnInit} from '@angular/core';
import {DatasetService} from "../../services/dataset.service";
import {ActivatedRoute} from "@angular/router";
import {EcgService} from "../../services/ecg.service";
import {Subscription} from "rxjs";
import {Dataset} from "../../models/dataset.model";
import {Ecg} from "../../models/ecg.model";

@Component({
  selector: 'app-specific-dataset',
  templateUrl: './specific-dataset.component.html',
  styleUrls: ['./specific-dataset.component.css']
})

export class SpecificDatasetComponent implements OnInit {
    // @ts-ignore
    dataset: Dataset;
    @Input() link = "/platform/dataset";
    constructor(private ecgService: EcgService,
                private datasetService: DatasetService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.params['id'];
        // @ts-ignore
        this.dataset= this.datasetService.getDatasetById(+id);
        // @ts-ignore
    }


}
