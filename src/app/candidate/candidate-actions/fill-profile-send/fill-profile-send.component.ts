import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ApplicationResponse } from '../../../shared/model/application-response.model';
import { ApplicationUtilities } from '../../../shared/model/application-utilities.model';
import { Vacancy } from '../../../shared/model/vacancy.model';
import { ApplicationsService } from '../../../shared/service/applications.service';
import { Candidate } from '../../model/candidate.model';
import { FeedbackMessageService } from './../../../shared/service/feedback-message.service';

@Component({
  selector: 'app-fill-profile-send',
  templateUrl: './fill-profile-send.component.html',
  styleUrls: ['./fill-profile-send.component.scss'],
})
export class FillProfileSendComponent implements OnInit, OnChanges {
  @Input() candidate: Candidate;
  vacancy: Vacancy;
  applications$: Observable<ApplicationResponse[]>;
  showErrorModal = false;

  constructor(
    private applicationsService: ApplicationsService,
    private feedbackMessage: FeedbackMessageService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.candidate.currentValue) {
      this.loadApplications();
    }
  }

  loadApplications(): void {
    this.applications$ = this.applicationsService
      .getCandidateApplications(this.candidate.id)
      .pipe(take(1));
  }

  vacancyChanged(vacancy): void {
    this.vacancy = vacancy;
  }

  send(): void {
    if (!this.candidate || !this.vacancy) {
      this.feedbackMessage.showWarningMessage(
        'Nenhuma candidato ou vaga selecionada.'
      );
    }

    this.sendRequest(this.vacancy.id);
  }

  private sendRequest(vacancyId: string): void {
    this.applicationsService
      .sendApplication(this.candidate.id, vacancyId)
      .pipe(take(1))
      .subscribe(() => {
        this.loadApplications();
        this.feedbackMessage.showSuccessMessage(
          `Email com a solicitação foi enviado para ${this.candidate.email}.`
        );
      });
  }

  toggleModal(): void {
    this.showErrorModal = !this.showErrorModal;
  }

  canTryAgain(application: ApplicationResponse): boolean {
    return application.status !== 'DONE';
  }

  sendAgain(vacancyId: string): void {
    this.sendRequest(vacancyId);
  }

  getStatusColor(application: ApplicationResponse): string {
    return ApplicationUtilities.getStatusColor(application.status);
  }
}
