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


// @ts-ignore
const appRoutes : Routes = [
    { path: 'auth', component: AuthComponent},
    { path: 'platform', component: InsideComponent},
    { path: 'platform/ecg', component: EcgComponent},
    { path: 'platform/dataset', component: DatasetComponent},
    { path: 'platform/patient', component: PatientComponent},
    { path: 'platform/medecin', component: MedecinComponent},
    { path: 'platform/patient', component: PatientComponent},
    { path: 'platform/dataset/ecg', component: SpecificEcgComponent},
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
        SpecificEcgComponent
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
