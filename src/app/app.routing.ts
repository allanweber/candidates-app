import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '', redirectTo: 'candidates', pathMatch: 'full' },
  {
    path: 'candidates',
    loadChildren: () =>
      import('./modules/candidate/candidate.module').then((m) => m.CandidateModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'vacancies',
    loadChildren: () =>
      import('./modules/vacancy/vacancy.module').then((m) => m.VacancyModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'candidate-application',
    loadChildren: () => import('./modules/application/candidate-application.module').then((m) => m.CandidateApplicationModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
