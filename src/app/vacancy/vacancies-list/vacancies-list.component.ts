import { take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { VacanciesService } from '../../shared/service/vacancies.service';
import { Component, OnInit } from '@angular/core';
import { Vacancy } from '../../shared/model/vacancy.model';

@Component({
  selector: 'app-vacancies-list',
  templateUrl: './vacancies-list.component.html',
  styleUrls: ['./vacancies-list.component.scss'],
})
export class VacanciesListComponent implements OnInit {
  vacancies$: Observable<Vacancy[]>;

  constructor(private vacancyService: VacanciesService) {}

  ngOnInit(): void {
    this.vacancies$ = this.vacancyService.getAll().pipe(take(1));
  }
}
