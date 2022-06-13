import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EcgService} from "../../services/ecg.service";
import {DatasetService} from "../../services/dataset.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Dataset} from "../../models/dataset.model";


@Component({
  selector: 'app-add-dataset',
  templateUrl: './add-dataset.component.html',
  styleUrls: ['./add-dataset.component.css']
})

export class AddDatasetComponent implements OnInit {
    name: any;
    description: any;
    // @ts-ignore
    datasetForm: FormGroup ;

    constructor(private ecgService: EcgService,
                private datasetService: DatasetService,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private router: Router) {
    }
    ngOnInit(): void {
        this.initForm();
        const id = this.route.snapshot.params['id'] || 0;
        if (id !== 0) {
            // @ts-ignore
            this.name= this.datasetService.getDatasetById(+id).name;
            // @ts-ignore
            this.description= this.datasetService.getDatasetById(+id).description;
        }
    }

    private initForm() {
        this.datasetForm = this.formBuilder.group(
            {
                name: ['', Validators.required],
                description: ['', Validators.required]
            }
        );
    }

    onSubmitForm() {
        // @ts-ignore
        const formValue = this.datasetForm.value;
        // @ts-ignore
        let newDataset = new Dataset(
            // @ts-ignore
            formValue['name'],
            formValue['description']
        );
        // @ts-ignore
        newDataset.id = this.datasetService.getNewId() + 1;
        this.datasetService.addDataset(newDataset);
        this.router.navigate(['/platform/dataset']);
    }
}
