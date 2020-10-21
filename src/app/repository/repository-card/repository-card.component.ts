import { Repository } from './../../shared/model/repository.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-repository-card',
  templateUrl: './repository-card.component.html',
  styleUrls: ['./repository-card.component.scss'],
})
export class RepositoryCardComponent implements OnInit {
  @Input() repository: Repository;

  constructor() {}

  ngOnInit(): void {}
}
