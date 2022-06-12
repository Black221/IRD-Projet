import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
    @Input() name = "ECG";
    @Input() last_update_at = "10/12/2020 10:45";
    @Input() last_view_at = "10/12/2020";
    @Input() objectName = "EntityName";

    @Input() link = "ecg"
  constructor() { }

  ngOnInit(): void {
  }

}
