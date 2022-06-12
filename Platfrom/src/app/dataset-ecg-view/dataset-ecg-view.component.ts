import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Ecg} from "../../models/ecg.model";
import {Subscription} from "rxjs";
import {EcgService} from "../../services/ecg.service";

@Component({
  selector: 'app-dataset-ecg-view',
  templateUrl: './dataset-ecg-view.component.html',
  styleUrls: ['./dataset-ecg-view.component.css']
})
export class DatasetEcgViewComponent implements OnInit, OnDestroy {
    link: any;
    name: any;
    last_view_at: any;
    objectName: any;
    last_update_at: any;

    ecgs: any[] | undefined;
    ecgSubcription: Subscription | undefined;


    constructor(private ecgService: EcgService) {

    }


    ngOnInit(): void {
          this.ecgSubcription = this.ecgService.ecgSubject.subscribe(
              (ecgs: Ecg[]) => {
                  this.ecgs = ecgs;
              }
          );
          this.ecgService.emitEcgSubject();
    }

    ngOnDestroy(): void {
        this.ecgSubcription?.unsubscribe();
        throw new Error('Method not implemented.');
    }
    @Input() dataset: any;
}
