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
    @Input() created_at : Date | String | null | undefined ;
    @Input() last_updated_at : Date | String | null | undefined;
    @Input() id: number | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
