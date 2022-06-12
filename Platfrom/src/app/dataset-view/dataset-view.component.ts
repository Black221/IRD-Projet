import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dataset-view',
  templateUrl: './dataset-view.component.html',
  styleUrls: ['./dataset-view.component.css']
})
export class DatasetViewComponent implements OnInit {
    @Input() name = "DatasetName";
    @Input() description = "Lorem ipsum dolor sit amet, consectetur adipisicing" +
        " elit. Assumenda commodi distinctio ducimus et eum magni nemo" +
        ", nisi vel vero voluptatem! Asperiores beatae corporis doloribus" +
        "    explicabo obcaecati quam quis ratione voluptatum?";
    @Input() created_at = "10/12/2021 10:18";
    @Input() last_update_at = "10/12/2021 10:18";
  constructor() { }

  ngOnInit(): void {
  }

}
