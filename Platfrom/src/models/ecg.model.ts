export class Ecg {
    public id: number | undefined;
    public number: string | undefined;
    // @ts-ignore
    public created_at: Date;
    // @ts-ignore
    public last_update_at: Date;
    // @ts-ignore
    public last_view: Date;

    constructor(public dataset_name: string,
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
