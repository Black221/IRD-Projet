import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.css']
})
export class PatientViewComponent implements OnInit {

    @Input() firstname: any;
    @Input() lastname: any;
    @Input() birthday: any;
    @Input() sex: any;
    @Input() id = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
