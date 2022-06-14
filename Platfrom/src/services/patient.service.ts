import {Patient} from "../models/patient.model";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class PatientService {

     private patients: Patient[]= [
         {
             id: 1,
             firstname: "Papa Bouna Bamba",
             lastname: "Bar",
             birthday: "29/03/2002",
             sex: "M",
             cni: "1068940916",
             nationality: "1068940916",
             address: {
                 address: "string",
                 country: "string",
                 city: "string",
             },
             phone: "string"
         },
         {
             id: 2,
             firstname: "Marie Waly",
             lastname: "Fall",
             birthday: "10/29/2002",
             sex: "F",
             cni: "1068940916",
             nationality: "1068940916",
             address: {
                 address: "string",
                 country: "string",
                 city: "string",
             },
             phone: "string"
         },
         {
             id: 3,
             firstname: "Mahomed",
             lastname: "Cissokho",
             birthday: "10/29/2002",
             sex: "M",
             cni: "1068940916",
             nationality: "1068940916",
             address: {
                 address: "string",
                 country: "string",
                 city: "string",
             },
             phone: "string"
         },
     ];

    patientSubject = new Subject<Patient[]>();

    emitPatientSubject () {
        // @ts-ignore
        this.patientSubject.next(this.patients.slice());
    }

    addPatient  (patient: Patient) {
        // @ts-ignore
        this.patients.push(patient);
        this.emitPatientSubject();
    }

    constructor() {
    }

    getPatientById(id: number) {
        return this.patients.find(
            (patientObject) => {
                return patientObject.id === id;
            }
        );
    }

}
