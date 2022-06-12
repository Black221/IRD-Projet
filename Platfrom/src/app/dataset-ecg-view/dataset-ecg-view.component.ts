import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dataset-ecg-view',
  templateUrl: './dataset-ecg-view.component.html',
  styleUrls: ['./dataset-ecg-view.component.css']
})
export class DatasetEcgViewComponent implements OnInit {
    link: any;
    name: any;
    last_view_at: any;
    objectName: any;
    last_update_at: any;

  constructor() { }

  ngOnInit(): void {
  }

}
