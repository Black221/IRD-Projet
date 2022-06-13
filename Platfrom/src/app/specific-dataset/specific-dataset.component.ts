import {Component, Input, OnInit} from '@angular/core';
import {DatasetService} from "../../services/dataset.service";
import {ActivatedRoute} from "@angular/router";
import {EcgService} from "../../services/ecg.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-specific-dataset',
  templateUrl: './specific-dataset.component.html',
  styleUrls: ['./specific-dataset.component.css']
})
export class SpecificDatasetComponent implements OnInit {
    @Input() name = "Covid-19";
    ecgs: any[] | undefined;
    ecgSubscription: Subscription | undefined;
    numberOfECG = 0;
    constructor(private ecgService: EcgService,
                private datasetService: DatasetService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.params['id'];
        // @ts-ignore
        this.name= this.datasetService.getDatasetById(+id).name;
        // @ts-ignore
        this.numberOfECG = this.ecgService.getNumberOfECG(this.name);
        // @ts-ignore
        this.ecgSubscription = this.ecgService.ecgSubject.subscribe(
            (ecgs: any[]) => {
                this.ecgs = ecgs;
            }
        );
        this.ecgService.emitEcgSubject();
    }


}
