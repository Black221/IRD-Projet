import {Ecg} from "../models/ecg.model";
import {Subject} from "rxjs";
import {formatDate} from "@angular/common";

export class EcgService {
    private ecgs = [
        {
            id: 1,
            dataset_name : "Covid-19",
            number: "ec123",
            filename : "",
            filepath: "",
            created_at: new Date(),
            last_update_at: new Date(),
            last_view: new Date(),
            recording: {
                start: "08:25",
                end: "08:38"
            },
            patient : {
                age : "45",
                height : "17",
                weight : "18",
                sex : "17"
            }
        },
        {
            number: "ec124",
            id: 2,
            dataset_name : "Ebola",
            filename : "",
            filepath: "",
            created_at: new Date(),
            last_update_at: new Date(),
            last_view: new Date(),
            recording: {
                start: "10:10",
                end: "10:17"
            },
            patient : {
                age : "45",
                height : "17",
                weight : "17",
                sex : "17"
            }
        },
        {
            id: 3,
            number: "ec125",
            dataset_name : "Covid-19",
            filename : "",
            filepath: "",
            created_at: new Date(),
            last_update_at: new Date(),
            last_view: new Date(),
            recording: {
                start: "09:45",
                end: "10:10"
            },
            patient : {
                age : "15",
                height : "15",
                weight : "15",
                sex : "15"
            }
        },
        {
            id: 4,
            number: "ec126",
            dataset_name : "Covid-19",
            filename : "",
            filepath: "",
            created_at: new Date(),
            last_update_at: new Date(),
            last_view: new Date(),
            recording: {
                start: "10:00",
                end: "10:10"
            },
            patient : {
                age : "14",
                height : "14",
                weight : "14",
                sex : "14"
            }
        },
        {
            id: 5,
            number: "ec127",
            dataset_name : "Ebola",
            filename : "",
            filepath: "",
            created_at: new Date(),
            last_update_at: new Date(),
            last_view: new Date(),
            recording: {
                start: "10:20",
                end: "10:30"
            },
            patient : {
                age : "13",
                height : "13",
                weight : "13",
                sex : "M"
            }
        },
        {
            id: 6,
            number: "ec128",
            dataset_name : "Covid-19",
            filename : "",
            filepath: "",
            created_at: new Date(),
            last_update_at: new Date(),
            last_view: new Date(),
            recording: {
                start: "10:10",
                end: "10:15"
            },
            patient : {
                age : "12",
                height : "12",
                weight : "12",
                sex : "M"
            }
        }
    ];

    ecgSubject = new Subject<Ecg[]>();

    emitEcgSubject () {
        // @ts-ignore
        this.ecgSubject.next(this.ecgs.slice());
    }

    addEcg (ecg: Ecg) {
        // @ts-ignore
        this.ecgs.push(ecg);
        this.emitEcgSubject();
    }


    getEcgtById(id: number) {
        return this.ecgs.find(
            (ecgObject) => {
                return ecgObject.id === id;
            }
        );
    }
}
