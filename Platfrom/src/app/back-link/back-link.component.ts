import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-back-link',
  templateUrl: './back-link.component.html',
  styleUrls: ['./back-link.component.css']
})
export class BackLinkComponent implements OnInit {
    @Input() link = "/platform";

  constructor() { }

  ngOnInit(): void {
  }

}
