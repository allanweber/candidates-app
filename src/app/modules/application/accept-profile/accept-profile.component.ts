import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CandidateApplicationService } from '../service/candidate-application.service';
import { FeedbackMessageService } from './../../../shared/service/feedback-message.service';
import { AccessTokenStorageService } from './../service/access-token-storage.service';

@Component({
  selector: 'app-accept-profile',
  templateUrl: './accept-profile.component.html',
  styleUrls: ['./accept-profile.component.scss'],
})
export class AcceptProfileComponent implements OnInit {
  applicationId: string;

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
      accessToken: this.validateForm.get('code').value,
    });

    this.candidateApplicationService
      .validateAccess()
      .pipe(take(1))
      .subscribe(() => this.router.navigate(['/candidate-application']));
  }

  isInvalid(name): boolean {
    const input = this.validateForm.get(name);
    return input.dirty && input.invalid;
  }
}
