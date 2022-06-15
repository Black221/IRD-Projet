import {Observable, Subject} from "rxjs";
import {Staff} from "../models/staff.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class StaffService {
    staffSubject = new Subject<Staff[]>();
    // @ts-ignore
    private staffsOnServer: Observable<Object> = [];
    private staffs: Staff[] = [
        {
            id: 1,
            sex:"string",
            firstname: "string",
            lastname: "string",
            email: "string",
            cni: "string",
            birthday: "10/10/2000",
            nationality: "string",
            login: "string",
            password: "string",
            profession: "string"
        },
        {
            id: 1,
            sex:"string",
            firstname: "string",
            lastname: "string",
            email: "string",
            cni: "string",
            birthday: "10/10/2000",
            nationality: "string",
            login: "string",
            password: "string",
            profession: "string"
        }
    ];

    constructor(private httpClient: HttpClient) {
    }
    emitStaffSubject() {
        this.staffSubject.next(this.staffs.slice())
    }

    getStaffById(id: number) {
        return this.staffs.find(
            (staffObject) => {
                return staffObject.id === id;
            }
        );
    }

    update () {
        this.emitStaffSubject();
    }

    delete () {
        this.emitStaffSubject();
    }

    add () {
        this.emitStaffSubject();
    }

    getNewId () {
        return this.staffs.length;
    }

    addStaff(newStaff: Staff) {
        // @ts-ignore
        this.staffs.push(newStaff);
        this.emitStaffSubject();
        this.saveStaffToServer(newStaff);
    }

    saveStaffToServer (staff: Staff) {
        // @ts-ignore
        this.httpClient
            .post('http://localhost:3000/staff', staff)
            .subscribe(
                (staff) => {
                    console.log('staff saved'+staff)
                },
                (error) => {
                    console.log('staff not saved'+error)
                }
            );
    }

    getStaffToServer () {
        this.staffsOnServer = this.httpClient.get('http://localhost:3000')
    }
}
