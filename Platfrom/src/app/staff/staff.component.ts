import { Component, OnInit } from '@angular/core';
import {Staff} from "../../models/staff.model";
import {Subscription} from "rxjs";
import {StaffService} from "../../services/staff.service";

@Component({
  selector: 'app-medecin',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
    // @ts-ignore
    staffs: Staff[];
    previous: any;
    next: any;
    // @ts-ignore
    staffSubscription: Subscription;

    constructor(private staffService: StaffService) {

    }

    ngOnInit () {
        this.staffSubscription = this.staffService.staffSubject.subscribe(
            (staffs: Staff[]) => {
                this.staffs = staffs;
            }
        );
        this.staffService.emitStaffSubject();
    }

}
