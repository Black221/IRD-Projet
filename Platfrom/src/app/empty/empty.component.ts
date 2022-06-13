import {Component, Input, OnInit} from '@angular/core';
import {UpperCasePipe} from "@angular/common";

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class EmptyComponent implements OnInit {
    // @ts-ignore
    @Input() entity: any = "ecg";

  constructor() { }

  ngOnInit(): void {
  }

}
