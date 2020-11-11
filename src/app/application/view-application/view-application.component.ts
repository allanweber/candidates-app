import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { FeedbackMessageService } from '../../shared/service/feedback-message.service';
import { AccessTokenStorageService } from '../service/access-token-storage.service';
import { CandidateApplicationService } from '../service/candidate-application.service';
import { DenyOptionComponent } from './../deny-option/deny-option.component';
import { DenyReason } from './../model/deny-reason.model';

@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.scss'],
})
export class ViewApplicationComponent implements OnInit {
  applicationId: string;
  @ViewChild(DenyOptionComponent, { static: false })
  denyComponent: DenyOptionComponent;

  public validateForm = this.builder.group({
    code: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
    ],
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private builder: FormBuilder,
    private messageService: FeedbackMessageService,
    private accessTokenStorageService: AccessTokenStorageService,
    private candidateApplicationService: CandidateApplicationService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(take(1)).subscribe((params) => {
      if (params.applicationId) {
        this.applicationId = params.applicationId;
        this.candidateApplicationService
          .validateView(this.applicationId)
          .pipe(take(1))
          .subscribe({
            next: null,
            error: () => this.navigateInvalid(),
          });
      }
    });
    this.accessTokenStorageService.remove();
  }

  login(): void {
    if (this.validateForm.invalid) {
      this.messageService.showWarningMessage('Dados informados são inválidos');
      return;
    }

    if (!this.applicationId) {
      this.messageService.showWarningMessage(
        'Código de registro não existe, contate o recrutador.'
      );
    }

    this.accessTokenStorageService.add({
      applicationId: this.applicationId,
      accessToken: this.validateForm.get('code').value.trim(),
    });

    const validateAccess = this.candidateApplicationService
      .validateAccess()
      .pipe(take(1));
    const accept = this.candidateApplicationService.accept().pipe(take(1));

    forkJoin([validateAccess, accept]).subscribe(
      () => this.router.navigate(['/candidate-application']),
      () => this.navigateInvalid()
    );
  }

  isInvalid(name): boolean {
    const input = this.validateForm.get(name);
    return input.dirty && input.invalid;
  }

  deny(): void {
    this.denyComponent.toggleModal();
  }

  reasonSelected(reason: DenyReason): void {
    this.candidateApplicationService
      .deny(this.applicationId, reason)
      .pipe(take(1))
      .subscribe(() => this.router.navigate(['/candidate-application/denied']));
  }

  private navigateInvalid(): void {
    this.router.navigate(['/candidate-application/invalid']);
  }
}
