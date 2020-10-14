import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { DenyReason } from '../model/deny-reason.model';
import { FeedbackMessageService } from './../../../shared/service/feedback-message.service';
import { CandidateApplicationService } from './../service/candidate-application.service';

@Component({
  selector: 'app-deny-option',
  templateUrl: './deny-option.component.html',
  styleUrls: ['./deny-option.component.scss'],
})
export class DenyOptionComponent implements OnInit {
  selected: DenyReason = null;
  emptyOption = 'Selecione um motivo';
  reasons: DenyReason[];
  extraReason: string;

  @Input() showErrorModal = false;
  @Output() reasonSelected: EventEmitter<DenyReason> = new EventEmitter<
    DenyReason
  >();

  constructor(
    private candidateApplicationService: CandidateApplicationService,
    private feedbackMessageService: FeedbackMessageService
  ) {}

  ngOnInit(): void {
    this.candidateApplicationService
      .getDenyReasons()
      .pipe(take(1))
      .subscribe((reasons) => (this.reasons = reasons));
  }

  onChange(value: string): void {
    if (value !== '0') {
      this.selected = this.reasons.filter(
        (reason) => reason.option === value
      )[0];
      if (this.selected.option !== 'OTHER') {
        this.extraReason = undefined;
      }
    } else {
      this.selected = null;
    }
  }

  select(reason: DenyReason): void {
    this.selected = reason;
  }

  send(): void {
    if (
      this.selected &&
      this.selected.option === 'OTHER' &&
      !this.extraReason
    ) {
      this.feedbackMessageService.showWarningMessage(
        'Para o motivo "Outro", descreva.'
      );
      return;
    }
    this.selected.extraReason = this.extraReason;
    this.reasonSelected.emit(this.selected);
    this.toggleModal();
  }

  toggleModal(): void {
    this.showErrorModal = !this.showErrorModal;
  }
}
