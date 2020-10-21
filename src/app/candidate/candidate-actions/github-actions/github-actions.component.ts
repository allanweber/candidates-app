import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { MessagingService } from '../../../core/service/messaging.service';
import { Candidate } from '../../model/candidate.model';
import { RepositoryCounter } from './../../../shared/model/repository-counter.model';
import { CandidateRepositoriesService } from './../../../shared/service/candidate-repositories.service';
import { FeedbackMessageService } from './../../../shared/service/feedback-message.service';
import { CandidatesService } from './../../service/candidates.service';

@Component({
  selector: 'app-github-actions',
  templateUrl: './github-actions.component.html',
  styleUrls: ['./github-actions.component.scss'],
})
export class GithubActionsComponent implements OnInit {
  @Input() candidate: Candidate;
  repositoryCounter: RepositoryCounter;

  showErrorModal = false;

  constructor(
    private candidatesService: CandidatesService,
    private candidateRepositoriesService: CandidateRepositoriesService,
    private feedbackMessage: FeedbackMessageService,
    private messagingService: MessagingService
  ) {}

  ngOnInit(): void {
    this.candidateRepositoriesService
      .count(this.candidate.id)
      .pipe(take(1))
      .subscribe((response) => (this.repositoryCounter = response));
  }

  access(): void {
    this.candidatesService
      .addGitSocialEntry(this.candidate.id, 'GITHUB')
      .pipe(take(1))
      .subscribe(() => {
        this.feedbackMessage.showSuccessMessage(
          'Solicitação de acesso ao GitHub enviada com sucesso ao candidato.'
        );
        this.messagingService.publish(Candidate, this.candidate);
      });
  }

  getGitAccessStatus(): string {
    return this.candidate.socialEntries?.find(
      (entry) => entry.type === 'GITHUB'
    ).status;
  }

  getGitAccessErro(): string {
    return this.candidate.socialEntries?.find(
      (entry) => entry.type === 'GITHUB'
    ).error;
  }

  getButtonText(): string {
    const status = this.getGitAccessStatus();
    if (status === 'GRANTED') {
      return 'Solicitar Atualização';
    }
    return 'Solicitar Acesso';
  }

  getGitAccessColor(): string {
    const status = this.getGitAccessStatus();
    if (status === 'PENDING') {
      return 'hsl(0, 0%, 4%)';
    } else if (status === 'RUNNING') {
      return 'hsl(204, 86%, 53%)';
    } else if (status === 'GRANTED') {
      return 'hsl(141, 71%, 48%)';
    } else if (status === 'ERROR') {
      return 'hsl(348, 100%, 61%)';
    } else if (status === 'DENIED') {
      return 'hsl(48, 100%, 67%)';
    } else {
      return status;
    }
  }

  getGitStatusTranslated(): string {
    const status = this.getGitAccessStatus();
    return this.translateStatus(status);
  }

  translateStatus(status: string): string {
    if (status === 'PENDING') {
      return 'Pendente';
    } else if (status === 'RUNNING') {
      return 'Processando...';
    } else if (status === 'GRANTED') {
      return 'Autorizado';
    } else if (status === 'ERROR') {
      return 'Erro';
    } else if (status === 'DENIED') {
      return 'Negado';
    } else {
      return status;
    }
  }

  toggleModal(): void {
    this.showErrorModal = !this.showErrorModal;
  }
}
