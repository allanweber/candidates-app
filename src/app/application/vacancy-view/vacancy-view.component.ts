import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { VacancyView } from '../model/vacancy-view.model';
import { VacancyViewService } from '../service/vacancy-view.service';

@Component({
  selector: 'app-vacancy-view',
  templateUrl: './vacancy-view.component.html',
  styleUrls: ['./vacancy-view.component.scss'],
})
export class VacancyViewComponent implements OnInit {
  @Input() applicationId: string;
  vacancy: VacancyView;

  constructor(private vacancyViewService: VacancyViewService) {}

  ngOnInit(): void {
    this.vacancyViewService
      .getVacancy(this.applicationId)
      .pipe(take(1))
      .subscribe((response) => (this.vacancy = response));
  }

  get isSalarySpecific(): boolean {
    return this.vacancy.salary?.from > 0 && this.vacancy.salary?.to === 0;
  }
}
