import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ecg-view',
  templateUrl: './ecg-view.component.html',
  styleUrls: ['./ecg-view.component.css']
})
export class EcgViewComponent implements OnInit {
    @Input() description = "Lorem lorem";
    @Input() last_view_at: any;
    @Input() last_update_at: any;
    @Input() name = "ECGName";

  constructor() { }

  ngOnInit(): void {
  }

}
