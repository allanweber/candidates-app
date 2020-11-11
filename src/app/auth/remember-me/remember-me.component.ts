import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { FeedbackMessageService } from './../../shared/service/feedback-message.service';
import { RegistrationService } from './../service/registration.service';

@Component({
  selector: 'app-remember-me',
  templateUrl: './remember-me.component.html',
  styleUrls: ['./remember-me.component.scss'],
})
export class RememberMeComponent implements OnInit {
  public messages: string[] = [];

  public rememberForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(128),
    ]),
  });

  constructor(
    private messageService: FeedbackMessageService,
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  enviar(): void {
    if (this.rememberForm.invalid) {
      this.messageService.showWarningMessage('Dados informados são inválidos');
      return;
    }

    const remember: any = {
      email: this.rememberForm.get('email').value,
    };

    Object.keys(remember).map((key) => (remember[key] = remember[key]?.trim()));

    this.registrationService
      .rememberMe(remember)
      .pipe(take(1))
      .subscribe(
        () => {
          this.messageService.showSuccessMessage(
            `Um email for enviado para ${remember.email} com instruções de como alterar sua senha.`
          );
          this.router.navigate(['/auth/signIn']);
        },
        (err) => this.messages.push(err.error.error)
      );
  }

  ngOnInit(): void {}

  isInvalid(name): boolean {
    const input = this.rememberForm.get(name);
    return input.dirty && input.invalid;
  }
}
