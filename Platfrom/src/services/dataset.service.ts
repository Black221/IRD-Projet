import {Observable, Subject} from "rxjs";
import {Dataset} from "../models/dataset.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class DatasetService {

    datasetSubject = new Subject<any[]>();
    // @ts-ignore
    private datasetsOnServer: Observable<Object> = [];
    private datasets: Dataset[] = [
        {
            id: 1,
            name: "Covid-19",
            description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur atque aut" +
                " beatae blanditiis consequatur corporis distinctio ea enim facere, fugit in perferendis quam quia" +
                " sint temporibus totam vel voluptatem?",
            created_at: new Date(),
            last_updated_at: new Date(),
            numberOfECG:4
        },
        {
            id: 2,
            name: "Ebola",
            description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur atque" +
                " aut beatae blanditiis consequatur corporis distinctio ea enim facere, fugit in perferendis quam" +
                " quia sint temporibus totam vel voluptatem?",
            created_at: new Date(),
            last_updated_at: new Date(),
            numberOfECG:2

        },
        {
            id: 3,
            name: "Malaria",
            description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur atque" +
                " aut beatae blanditiis consequatur corporis distinctio ea enim facere, fugit in perferendis quam" +
                " quia sint temporibus totam vel voluptatem?",
            created_at: new Date(),
            last_updated_at: new Date(),
            numberOfECG:0
        },
    ];

    constructor(private httpClient: HttpClient) {
    }
    emitDatasetSubject() {
        this.datasetSubject.next(this.datasets.slice())
    }

    getDatasetById(id: number) {
        return this.datasets.find(
            (datasetObject) => {
                return datasetObject.id === id;
            }
        );
    }

    update () {
        this.emitDatasetSubject();
    }

    delete () {
        this.emitDatasetSubject();
    }

    add () {
        this.emitDatasetSubject();
    }

    getNewId () {
        return this.datasets.length;
    }

    addDataset(newDataset: Dataset) {
        // @ts-ignore
        this.datasets.push(newDataset);
        this.emitDatasetSubject();
        this.saveDatasetToServer(newDataset);
    }

    saveDatasetToServer (dataset: Dataset) {
        // @ts-ignore
        this.httpClient
            .post('http://localhost:3000/dataset', dataset)
            .subscribe(
                () => {
                    console.log('Dataset saved')
                },
                (error) => {
                    console.log('Dataset not saved'+error)
                }
            );
    }

    getDatasetToServer () {
        this.datasetsOnServer = this.httpClient.get('http://localhost:3000')
    }
}
