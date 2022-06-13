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
    @Input() dataset: any;
    @Input() dataset_r:  string | undefined | null;
    @Input() last_updated_at: any;
    @Input() id = 0;
    @Input() ecgCount = 0;

  constructor() { }

  ngOnInit(): void {
      if (this.dataset === this.dataset_r) {
          this.ecgCount ++;
      }
  }

}
