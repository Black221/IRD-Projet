export class Patient {
    constructor(
                public id: number,
                public firstname: string,
                public lastname: string,
                public birthday: string,
                public sex: string,
                public cni: string,
                public nationality: string,
                public address: {
                    address: string,
                    country: string,
                    city: string,
                    },
                public phone: string) {
    }
}
