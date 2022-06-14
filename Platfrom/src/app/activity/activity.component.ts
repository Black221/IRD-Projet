import {Component, Input, OnInit} from '@angular/core';
import {ActivityModel} from "../../models/activity.model";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {


    @Input() link = "ecg"
    // @ts-ignore
    @Input() activity: ActivityModel;
  constructor() { }

  ngOnInit(): void {

  }

}
