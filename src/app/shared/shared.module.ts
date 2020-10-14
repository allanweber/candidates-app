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
import { SkillEditComponent } from './components/skill-edit/skill-edit.component';
import { VacanciesDropdownComponent } from './components/vacancies-dropdown/vacancies-dropdown.component';
import { SliceKeepLastWordPipe } from './pipes/slice-keep-last-word.pipe';

@NgModule({
  declarations: [
    ErrorMessagesComponent,
    NavBarComponent,
    VacanciesDropdownComponent,
    SliceKeepLastWordPipe,
    CandidateProfileFormComponent,
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
    DateViewComponent,
    SkillEditComponent,
  ],
})
export class SharedModule {}
