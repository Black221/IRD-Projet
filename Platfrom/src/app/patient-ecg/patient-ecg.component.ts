import {Component, Input, OnInit} from '@angular/core';
import {Ecg} from "../../models/ecg.model";
import {Dataset} from "../../models/dataset.model";
import {Patient} from "../../models/patient.model";
import {EcgService} from "../../services/ecg.service";
import {DatasetService} from "../../services/dataset.service";
import {PatientService} from "../../services/patient.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-patient-ecg',
  templateUrl: './patient-ecg.component.html',
  styleUrls: ['./patient-ecg.component.css']
})
export class PatientEcgComponent implements OnInit {

    // @ts-ignore
    datasets: Dataset[] | undefined;
    // @ts-ignore
    datasetSubscription: Subscription | undefined;
    // @ts-ignore
    ecgs: Ecg[] | undefined;
    // @ts-ignore
    ecgSubscription: Subscription | undefined;
    // @ts-ignore
    patient: Patient;
    @Input() link = "/platform/patient/";

    constructor(private ecgService: EcgService,
                private datasetService: DatasetService,
                private patientService: PatientService,
                private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        const id = this.route.snapshot.params['id'];
        // @ts-ignore
        this.patient = this.patientService.getPatientById(+id);
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
        this.link = this.link + this.patient.id;
    }

    haveThisDataset(dataset: string) {
        // @ts-ignore
        for (const ecg of this.ecgs)
            if( ecg.dataset_name == dataset && ecg.patient.id === this.patient.id)
                return true;
        return false;
    }
}
