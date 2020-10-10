import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CandidateRegisterService } from '../service/candidate-register.service';
import { FeedbackMessageService } from './../../../shared/service/feedback-message.service';
import { AccessTokenStorageService } from './../service/access-token-storage.service';

@Component({
  selector: 'app-accept-profile',
  templateUrl: './accept-profile.component.html',
  styleUrls: ['./accept-profile.component.scss'],
})
export class AcceptProfileComponent implements OnInit {
  registerId: string;

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
    private candidateRegisterService: CandidateRegisterService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(take(1)).subscribe((params) => {
      if (params.registerId) {
        this.registerId = params.registerId;
      }
    });
    this.accessTokenStorageService.remove();
  }

  login(): void {
    if (this.validateForm.invalid) {
      this.messageService.showWarningMessage('Dados informados são inválidos');
      return;
    }

    if (!this.registerId) {
      this.messageService.showWarningMessage(
        'Código de registro não existe, contate o recrutador.'
      );
    }

    this.accessTokenStorageService.add({
      registerId: this.registerId,
      accessToken: this.validateForm.get('code').value,
    });

    this.candidateRegisterService
      .validateAccess()
      .pipe(take(1))
      .subscribe(() => this.router.navigate(['/candidate-register']));
  }

  isInvalid(name): boolean {
    const input = this.validateForm.get(name);
    return input.dirty && input.invalid;
  }
}
