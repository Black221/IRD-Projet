import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { EcgComponent } from './ecg/ecg.component';
import { DatasetComponent } from './dataset/dataset.component';
import { PatientComponent } from './patient/patient.component';
import { StaffComponent } from './staff/staff.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HistoryComponent } from './history/history.component';
import {RouterModule, Routes} from "@angular/router";
import { InsideComponent } from './inside/inside.component';
import { SpecificEcgComponent } from './specific-ecg/specific-ecg.component';
import { DatasetViewComponent } from './dataset-view/dataset-view.component';
import { EcgViewComponent } from './ecg-view/ecg-view.component';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { StaffViewComponent } from './staff-view/staff-view.component';
import { DatasetEcgComponent } from './dataset-ecg/dataset-ecg.component';
import { ActivityComponent } from './activity/activity.component';
import { SpecificDatasetComponent } from './specific-dataset/specific-dataset.component';
import { AddEcgComponent } from './add-ecg/add-ecg.component';
import { AddDatasetComponent } from './add-dataset/add-dataset.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { AddPersonnelComponent } from './add-personnel/add-personnel.component';
import {DatasetService} from "../services/dataset.service";
import {EcgService} from "../services/ecg.service";
import { EmptyComponent } from './empty/empty.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {PatientService} from "../services/patient.service";
import { SpecificPatientComponent } from './specific-patient/specific-patient.component';
import { PatientEcgComponent } from './patient-ecg/patient-ecg.component';
import { BackLinkComponent } from './back-link/back-link.component';
import { SpecificDatasetEcgComponent } from './specific-dataset-ecg/specific-dataset-ecg.component';
import { SpecificStaffComponent } from './specific-staff/specific-staff.component';
import {StaffService} from "../services/staff.service";
import { FilterComponent } from './filter/filter.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { EditDatasetComponent } from './edit-dataset/edit-dataset.component';

// @ts-ignore
const appRoutes : Routes = [
    { path: '', component: AuthComponent},
    { path: 'platform', component: HistoryComponent},
    { path: 'platform/home', component: HistoryComponent},
    { path: 'platform/dataset', component: DatasetComponent},
    { path: 'platform/dataset/add', component: AddDatasetComponent},
    { path: 'platform/ecg', component: DatasetEcgComponent},
    { path: 'platform/ecg/add', component: AddEcgComponent},
    { path: 'platform/patient', component: PatientComponent},
    { path: 'platform/staff', component: StaffComponent},
    { path: 'platform/staff/add', component: AddPersonnelComponent},
    { path: 'platform/patient/add', component: AddPatientComponent},
];

const secondRoutes: Routes = [
    { path: 'platform/dataset/ecg/:id/:page', component: SpecificDatasetEcgComponent},
    { path: 'platform/dataset/ecg/:id', component: SpecificDatasetEcgComponent},
    { path: 'platform/dataset/edit/:id', component: AddDatasetComponent},
    { path: 'platform/ecg/edit/:id', component: AddEcgComponent},
    { path: 'platform/staff/edit/:id', component: AddPersonnelComponent},
    { path: 'platform/patient/edit/:id', component: AddPersonnelComponent},
    { path: 'platform/ecg/:id', component: SpecificEcgComponent},
    { path: 'platform/patient/ecg/:id', component: PatientEcgComponent},
    { path: 'platform/patient/:id', component: SpecificPatientComponent},
    { path: 'platform/dataset/:id', component: SpecificDatasetComponent},
    { path: 'platform/staff/:id', component: StaffComponent},

];


@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        EcgComponent,
        DatasetComponent,
        PatientComponent,
        StaffComponent,
        HeaderComponent,
        FooterComponent,
        HistoryComponent,
        InsideComponent,
        SpecificEcgComponent,
        DatasetViewComponent,
        EcgViewComponent,
        PatientViewComponent,
        StaffViewComponent,
        DatasetEcgComponent,
        ActivityComponent,
        SpecificDatasetComponent,
        AddEcgComponent,
        AddDatasetComponent,
        AddPatientComponent,
        AddPersonnelComponent,
        EmptyComponent,
        NavBarComponent,
        SpecificPatientComponent,
        PatientEcgComponent,
        BackLinkComponent,
        SpecificDatasetEcgComponent,
        SpecificStaffComponent,
        FilterComponent,
        EditPatientComponent,
        EditStaffComponent,
        EditDatasetComponent
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        RouterModule.forChild(secondRoutes),
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [
        DatasetService,
        PatientService,
        StaffService,
        EcgService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
