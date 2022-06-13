import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { EcgComponent } from './ecg/ecg.component';
import { DatasetComponent } from './dataset/dataset.component';
import { PatientComponent } from './patient/patient.component';
import { MedecinComponent } from './medecin/medecin.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HistoryComponent } from './history/history.component';
import {RouterModule, Routes} from "@angular/router";
import { InsideComponent } from './inside/inside.component';
import { SpecificEcgComponent } from './specific-ecg/specific-ecg.component';
import { DatasetViewComponent } from './dataset-view/dataset-view.component';
import { EcgViewComponent } from './ecg-view/ecg-view.component';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { MedecinViewComponent } from './medecin-view/medecin-view.component';
import { DatasetEcgComponent } from './dataset-ecg/dataset-ecg.component';
import { ActivityComponent } from './activity/activity.component';
import { SpecificDatasetComponent } from './specific-dataset/specific-dataset.component';
import { AddEcgComponent } from './add-ecg/add-ecg.component';
import { AddDatasetComponent } from './add-dataset/add-dataset.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { AddMedecinComponent } from './add-medecin/add-medecin.component';
import {DatasetService} from "../services/dataset.service";
import {EcgService} from "../services/ecg.service";
import { EmptyComponent } from './empty/empty.component';
import {ReactiveFormsModule} from "@angular/forms";


// @ts-ignore
const appRoutes : Routes = [
    { path: 'platform', component: HistoryComponent},
    { path: 'platform/home', component: HistoryComponent},
    { path: 'platform/dataset', component: DatasetComponent},
    { path: 'platform/dataset/add', component: AddDatasetComponent},
    { path: 'platform/ecg', component: DatasetEcgComponent},
    { path: 'platform/ecg/add', component: AddEcgComponent},
    { path: 'platform/patient', component: PatientComponent},
    { path: 'platform/medecin', component: MedecinComponent},
    { path: 'platform/medecin/add', component: AddMedecinComponent},
    { path: 'platform/patient/add', component: AddPatientComponent},
];

const secondRoutes: Routes = [
    { path: 'platform/dataset/edit/:id', component: AddDatasetComponent},
    { path: 'platform/ecg/edit/:id', component: AddEcgComponent},
    { path: 'platform/medecin/edit/:id', component: AddMedecinComponent},
    { path: 'platform/patient/edit/:id', component: AddMedecinComponent},
    { path: 'platform/ecg/:id', component: SpecificEcgComponent},
    { path: 'platform/patient/:id', component: PatientComponent},
    { path: 'platform/dataset/:id', component: SpecificDatasetComponent},
    { path: 'platform/medecin/:id', component: MedecinComponent},

];

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        EcgComponent,
        DatasetComponent,
        PatientComponent,
        MedecinComponent,
        HeaderComponent,
        FooterComponent,
        HistoryComponent,
        InsideComponent,
        SpecificEcgComponent,
        DatasetViewComponent,
        EcgViewComponent,
        PatientViewComponent,
        MedecinViewComponent,
        DatasetEcgComponent,
        ActivityComponent,
        SpecificDatasetComponent,
        AddEcgComponent,
        AddDatasetComponent,
        AddPatientComponent,
        AddMedecinComponent,
        EmptyComponent
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        RouterModule.forChild(secondRoutes),
        BrowserModule,
        ReactiveFormsModule
    ],
    providers: [
        DatasetService,
        EcgService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
