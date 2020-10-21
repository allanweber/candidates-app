import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-last-update',
  templateUrl: './last-update.component.html',
  styleUrls: ['./last-update.component.scss']
})
export class LastUpdateComponent implements OnInit {

  @Input() lastUpdate: Date;

  constructor() { }

  ngOnInit(): void {
  }

}
