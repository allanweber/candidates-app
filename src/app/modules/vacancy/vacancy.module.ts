import { NgxCurrencyModule } from 'ngx-currency';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { VacanciesListComponent } from './vacancies-list/vacancies-list.component';
import { VacancyRoutingModule } from './vacancy.routing';
import { VacancyComponent } from './vacancy/vacancy.component';

@NgModule({
  declarations: [VacanciesListComponent, VacancyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VacancyRoutingModule,
    SharedModule,
    NgxCurrencyModule,
  ],
})
export class VacancyModule {}
