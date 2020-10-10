import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { CandidateProfileFormComponent } from './components/candidate-profile-form/candidate-profile-form.component';
import { DateViewComponent } from './components/date-view/date-view.component';
import { ErrorMessagesComponent } from './components/error-messages/error-messages.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { VacanciesDropdownComponent } from './components/vacancies-dropdown/vacancies-dropdown.component';
import { VacancyViewComponent } from './components/vacancy-view/vacancy-view.component';
import { SliceKeepLastWordPipe } from './pipes/slice-keep-last-word.pipe';
import { SkillEditComponent } from './components/skill-edit/skill-edit.component';

@NgModule({
  declarations: [
    ErrorMessagesComponent,
    NavBarComponent,
    VacanciesDropdownComponent,
    SliceKeepLastWordPipe,
    CandidateProfileFormComponent,
    VacancyViewComponent,
    DateViewComponent,
    SkillEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forChild(),
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
    DateViewComponent,
    SkillEditComponent,
  ],
})
export class SharedModule {}
