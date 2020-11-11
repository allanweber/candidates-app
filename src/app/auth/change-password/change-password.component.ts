import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { FeedbackMessageService } from './../../shared/service/feedback-message.service';
import { RegistrationService } from './../service/registration.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  private hash: string;
  public messages: string[] = [];

  public changeForm = this.builder.group(
    {
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(128)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(128),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(128),
        ],
      ],
    },
    {
      validator: this.mustMatch('password', 'confirmPassword'),
    }
  );

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private builder: FormBuilder,
    private messageService: FeedbackMessageService,
    private registrationService: RegistrationService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(take(1)).subscribe((params) => {
      if (params.hash) {
        this.hash = params.hash;
      } else {
        this.messageService.showErrorMessage(
          'Requisição de alteração de senha é inválida.'
        );
        this.router.navigate(['/auth/signIn']);
      }
    });
  }

  send(): void {
    if (this.changeForm.invalid) {
      this.messageService.showWarningMessage('Dados informados são inválidos');
      return;
    }

    const change: any = {
      hash: this.hash,
      email: this.changeForm.get('email').value,
      password: this.changeForm.get('password').value,
      confirmPassword: this.changeForm.get('confirmPassword').value,
    };

    Object.keys(change).map((key) => (change[key] = change[key]?.trim()));

    this.registrationService.changePassword(change).subscribe(
      () => {
        this.messageService.showSuccessMessage('Senha alterada com sucesso.');
        this.router.navigate(['/auth/signIn']);
      },
      (err) => this.messages.push(err.error.error)
    );
  }

  isInvalid(name): boolean {
    const input = this.changeForm.get(name);
    return input.dirty && input.invalid;
  }

  private mustMatch(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
