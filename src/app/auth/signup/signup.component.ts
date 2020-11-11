import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedbackMessageService } from './../../shared/service/feedback-message.service';
import { RegistrationService } from './../service/registration.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public messages: string[] = [];

  public registerForm = this.builder.group(
    {
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(128),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(128),
        ],
      ],
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(128),
        ],
      ],
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
    private registrationService: RegistrationService,
    private messageService: FeedbackMessageService,
    private builder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  register(): void {
    if (this.registerForm.invalid) {
      this.messageService.showWarningMessage('Dados informados são inválidos');
      return;
    }

    const register: any = this.registerForm.value;

    Object.keys(register).map((key) => (register[key] = register[key]?.trim()));

    this.registrationService.register(this.registerForm.value).subscribe(
      () => {
        this.messageService.showSuccessMessage(
          `Um email for enviado para ${
            this.registerForm.get('email').value
          } para confirmar sua conta, antes de fazer login.`
        );
        this.router.navigate(['/auth/signIn']);
      },
      (err) => {
        this.parseErrors(err.error);
      }
    );
  }

  isInvalid(name): boolean {
    const input = this.registerForm.get(name);
    return input.dirty && input.invalid;
  }

  setUsername(): void {
    const userName: string =
      this.registerForm.get('firstName').value +
      this.registerForm.get('lastName').value;
    this.registerForm.get('userName').setValue(userName.toLowerCase());
  }

  mustMatch(controlName: string, matchingControlName: string): any {
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

  parseErrors(errors: any): void {
    errors.detail?.forEach((error) => {
      const field = this.registerForm.get(error.fieldName);
      if (field) {
        field.markAsDirty();
        field.setErrors({ required: true });
        this.messages.push(error.message);
      }
    });
  }
}
