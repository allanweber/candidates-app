import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { CandidateProfileFormComponent } from './components/candidate-profile-form/candidate-profile-form.component';
import { ErrorMessagesComponent } from './components/error-messages/error-messages.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { VacanciesDropdownComponent } from './components/vacancies-dropdown/vacancies-dropdown.component';
import { SliceKeepLastWordPipe } from './pipes/slice-keep-last-word.pipe';
import { VacancyViewComponent } from './components/vacancy-view/vacancy-view.component';

@NgModule({
  declarations: [
    ErrorMessagesComponent,
    NavBarComponent,
    VacanciesDropdownComponent,
    SliceKeepLastWordPipe,
    CandidateProfileFormComponent,
    VacancyViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [SliceKeepLastWordPipe],
  exports: [
    ErrorMessagesComponent,
    NavBarComponent,
    VacanciesDropdownComponent,
    SliceKeepLastWordPipe,
    CandidateProfileFormComponent,
    CandidateProfileFormComponent,
    CandidateProfileFormComponent,
    VacancyViewComponent,
  ],
})
export class SharedModule {}
