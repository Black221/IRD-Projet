export class Ecg {

    constructor(public datasetName: string,
                public filename: string,
                public filepath: string,
                public recording: {
                    start: string,
                    end: string
                },
                public patient : {
                    age : string,
                    height : string,
                    weight : string,
                    sex : string
                }) {
    }
}
