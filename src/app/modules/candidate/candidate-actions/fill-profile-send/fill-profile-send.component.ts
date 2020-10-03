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
import { CandidateRegisterResponse } from './../../../../shared/model/candidate-register-response.model';
import { FeedbackMessageService } from './../../../../shared/service/feedback-message.service';
import { Candidate } from '../../model/candidate.model';
import { CandidatesService } from './../../service/candidates.service';

@Component({
  selector: 'app-fill-profile-send',
  templateUrl: './fill-profile-send.component.html',
  styleUrls: ['./fill-profile-send.component.scss'],
})
export class FillProfileSendComponent implements OnInit, OnChanges {
  @Input() candidate: Candidate;
  vacancy: Vacancy;
  registers$: Observable<CandidateRegisterResponse[]>;
  showErrorModal = false;

  constructor(
    private candidatesService: CandidatesService,
    private feedbackMessage: FeedbackMessageService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.candidate.currentValue) {
      this.loadRegisters();
    }
  }

  loadRegisters(): void {
    this.registers$ = this.candidatesService
      .getCandidateRegisters(this.candidate.id)
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
    this.candidatesService
      .sendRegisterRequest(this.candidate.id, vacancyId)
      .pipe(take(1))
      .subscribe(() => {
        this.loadRegisters();
        this.feedbackMessage.showSuccessMessage(
          `Email com a solicitação foi enviado para ${this.candidate.email}.`
        );
      });
  }

  toggleModal(): void {
    this.showErrorModal = !this.showErrorModal;
  }

  canTryAgain(candidateRegisterResponse: CandidateRegisterResponse): boolean {
    return candidateRegisterResponse.status !== 'DONE';
  }

  sendAgain(vacancyId: string): void {
    this.sendRequest(vacancyId);
  }

  getStatusColor(candidateRegisterResponse: CandidateRegisterResponse): string {
    const status = candidateRegisterResponse.status;
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
