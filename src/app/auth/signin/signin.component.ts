import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/service/authentication.service';
import { FeedbackMessageService } from './../../shared/service/feedback-message.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  public loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(128),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(128),
    ]),
  });

  constructor(
    private messageService: FeedbackMessageService,
    private authenticationService: AuthenticationService
  ) {}

  login(): void {
    if (this.loginForm.invalid) {
      this.messageService.showWarningMessage('Dados informados são inválidos');
      return;
    }

    const credentials: any = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };

    Object.keys(credentials).map(
      (key) => (credentials[key] = credentials[key]?.trim())
    );

    this.authenticationService.authenticate(credentials);
  }

  ngOnInit(): void {}

  isInvalid(name): boolean {
    const input = this.loginForm.get(name);
    return input.dirty && input.invalid;
  }
}
