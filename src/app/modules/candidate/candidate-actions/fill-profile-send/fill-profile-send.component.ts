import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Vacancy } from '../../../vacancy/model/vacancy.model';
import { Candidate } from '../../model/candidate.model';
import { CandidateApplicationResponse } from '../../../../shared/model/candidate-application-response.model';
import { FeedbackMessageService } from './../../../../shared/service/feedback-message.service';
import { ApplicationsService } from '../../../../shared/service/applications.service';

@Component({
  selector: 'app-fill-profile-send',
  templateUrl: './fill-profile-send.component.html',
  styleUrls: ['./fill-profile-send.component.scss'],
})
export class FillProfileSendComponent implements OnInit, OnChanges {
  @Input() candidate: Candidate;
  vacancy: Vacancy;
  applications$: Observable<CandidateApplicationResponse[]>;
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

  canTryAgain(application: CandidateApplicationResponse): boolean {
    return application.status !== 'DONE';
  }

  sendAgain(vacancyId: string): void {
    this.sendRequest(vacancyId);
  }

  getStatusColor(application: CandidateApplicationResponse): string {
    const status = application.status;
    if (status === 'PENDING') {
      return 'hsl(0, 0%, 4%)';
    } else if (status === 'ACCEPTED') {
      return 'hsl(204, 86%, 53%)';
    } else if (status === 'DONE') {
      return 'hsl(141, 71%, 48%)';
    } else if (status === 'ERROR') {
      return 'hsl(348, 100%, 61%)';
    } else if (status === 'DENIED') {
      return 'hsl(48, 100%, 67%)';
    } else {
      return status;
    }
  }
}
