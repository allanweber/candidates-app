import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Vacancy } from '../../../modules/vacancy/model/vacancy.model';
import { SliceKeepLastWordPipe } from './../../pipes/slice-keep-last-word.pipe';
import { VacanciesService } from './../../service/vacancies.service';

@Component({
  selector: 'app-vacancies-dropdown',
  templateUrl: './vacancies-dropdown.component.html',
  styleUrls: ['./vacancies-dropdown.component.scss'],
})
export class VacanciesDropdownComponent implements OnInit {
  @Input() emptyOption = 'Selecione uma vaga';
  selected: string = null;
  vacancies$: Observable<Vacancy[]>;

  @Output() changed: EventEmitter<Vacancy> = new EventEmitter<Vacancy>();

  constructor(
    private vacanciesService: VacanciesService,
    private sliceKeepLastWordPipe: SliceKeepLastWordPipe
  ) {}

  ngOnInit(): void {
    this.vacancies$ = this.vacanciesService.getAll().pipe(take(1));
  }

  select(vacancy: Vacancy): void {
    this.selected = `${vacancy.name} - ${this.sliceKeepLastWordPipe.transform(
      vacancy.description,
      50
    )}`;
    this.changed.emit(vacancy);
  }
}
