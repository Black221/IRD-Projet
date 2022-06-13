export class Dataset {
    public created_at = new Date();
    public last_updated_at = new Date();
    public id: number | undefined;
    public numberOfECG = 0;
    constructor(public name: string,
                public description: string,
                ) {
    }
}
