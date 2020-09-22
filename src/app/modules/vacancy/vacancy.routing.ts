import { VacancyComponent } from './vacancy/vacancy.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacanciesListComponent } from './vacancies-list/vacancies-list.component';

const routes: Routes = [
  { path: '', component: VacanciesListComponent },
  { path: ':id/editar', component: VacancyComponent },
  { path: 'adicionar', component: VacancyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacancyRoutingModule {}
