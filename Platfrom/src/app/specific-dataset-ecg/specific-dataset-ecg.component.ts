import { Component, OnInit } from '@angular/core';
import {Dataset} from "../../models/dataset.model";
import {ActivatedRoute} from "@angular/router";
import {DatasetService} from "../../services/dataset.service";
import {EcgService} from "../../services/ecg.service";
import {Ecg} from "../../models/ecg.model";

@Component({
  selector: 'app-specific-dataset-ecg',
  templateUrl: './specific-dataset-ecg.component.html',
  styleUrls: ['./specific-dataset-ecg.component.css']
})
export class SpecificDatasetEcgComponent implements OnInit {
    // @ts-ignore
    dataset: Dataset;
    // @ts-ignore
    ecgs: Ecg[];
    // @ts-ignore
    numberOfECG: number
    // @ts-ignore
    link = "/platform/dataset/"
    // @ts-ignore
    previous: number;
    // @ts-ignore
    next: number
  constructor (private route: ActivatedRoute,
               private datasetService: DatasetService,
               private ecgService: EcgService) { }

  ngOnInit(): void {
      const id = this.route.snapshot.params['id'];
      const page = this.route.snapshot.params['page'];
      // @ts-ignore
      this.dataset= this.datasetService.getDatasetById(+id);
      // @ts-ignore
      this.numberOfECG = this.ecgService.getNumberOfECG(this.dataset.name);
      // @ts-ignore
      this.ecgSubscription = this.ecgService.ecgSubject.subscribe(
          (ecgs: any[]) => {
              this.ecgs = ecgs;
          }
      );
      this.ecgService.emitEcgSubject();
      this.link = this.link + this.dataset.id;
  }

}
