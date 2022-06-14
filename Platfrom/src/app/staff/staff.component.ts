import { Component, OnInit } from '@angular/core';
import {Staff} from "../../models/staff.model";

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

  constructor() { }

  ngOnInit(): void {
  }

}
