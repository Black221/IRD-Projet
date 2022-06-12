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
import { DatasetEcgViewComponent } from './dataset-ecg-view/dataset-ecg-view.component';


// @ts-ignore
const appRoutes : Routes = [
    { path: 'platform', component: HistoryComponent},
    { path: 'platform/home', component: HistoryComponent},
    { path: 'platform/dataset', component: DatasetComponent},
    { path: 'platform/dataset/ecg/:id', component: SpecificEcgComponent},
    { path: 'platform/ecg', component: DatasetEcgComponent},
    { path: 'platform/ecg/:id', component: EcgComponent},
    { path: 'platform/patient', component: PatientComponent},
    { path: 'platform/patient/:id', component: PatientComponent},
    { path: 'platform/medecin', component: MedecinComponent},
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
        DatasetEcgViewComponent
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
