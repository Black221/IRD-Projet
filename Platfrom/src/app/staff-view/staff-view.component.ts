import {Component, Input, OnInit} from '@angular/core';
import {Staff} from "../../models/staff.model";

@Component({
  selector: 'app-staff-view',
  templateUrl: './staff-view.component.html',
  styleUrls: ['./staff-view.component.css']
})
export class StaffViewComponent implements OnInit {

    constructor() { }
    // @ts-ignore
    @Input() staff: Staff;

    ngOnInit(): void {
    }

}
