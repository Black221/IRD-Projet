import {Subject} from "rxjs";

export class DatasetService {

    datasetSubject = new Subject<any[]>();
    private datasets = [
        {
            id: 1,
            name: "Covid-19",
            description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur atque aut" +
                " beatae blanditiis consequatur corporis distinctio ea enim facere, fugit in perferendis quam quia" +
                " sint temporibus totam vel voluptatem?",
            created_at: new Date(),
            last_updated_at: new Date(),
        },
        {
            id: 2,
            name: "Ebola",
            description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur atque" +
                " aut beatae blanditiis consequatur corporis distinctio ea enim facere, fugit in perferendis quam" +
                " quia sint temporibus totam vel voluptatem?",
            created_at: new Date(),
            last_updated_at: new Date(),
        },
        {
            id: 3,
            name: "Paludisme",
            description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur atque" +
                " aut beatae blanditiis consequatur corporis distinctio ea enim facere, fugit in perferendis quam" +
                " quia sint temporibus totam vel voluptatem?",
            created_at: new Date(),
            last_updated_at: new Date(),
        },
    ];

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
}
