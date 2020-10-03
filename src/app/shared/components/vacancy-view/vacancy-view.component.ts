import { Component, Input, OnInit } from '@angular/core';
import { VacancyView } from './../../model/vacancy-view.mode';

@Component({
  selector: 'app-vacancy-view',
  templateUrl: './vacancy-view.component.html',
  styleUrls: ['./vacancy-view.component.scss'],
})
export class VacancyViewComponent implements OnInit {
  @Input() vacancy: VacancyView;

  constructor() {}

  ngOnInit(): void {}
}
