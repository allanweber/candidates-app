import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { FeedbackMessageService } from './../../shared/service/feedback-message.service';
import { CandidatesService } from './../service/candidates.service';

@Component({
  selector: 'app-candidate-add',
  templateUrl: './candidate-add.component.html',
  styleUrls: ['./candidate-add.component.scss'],
})
export class CandidateAddComponent implements OnInit {
  messages: string[] = [];

  public candidateForm = this.builder.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private messageService: FeedbackMessageService,
    private candidatesService: CandidatesService
  ) {}

  ngOnInit(): void {}

  save(): void {
    if (this.candidateForm.invalid) {
      this.messageService.showWarningMessage('Dados informados são inválidos');
      return;
    }

    this.candidatesService
      .add(this.candidateForm.value)
      .pipe(take(1))
      .subscribe(
        (response) => {
          this.messageService.showSuccessMessage('Candidato salva com sucesso');
          this.router.navigate([`/candidates/${response.id}/candidate`]);
        },
        (err) => {
          this.parseErrors(err.error);
        }
      );
  }

  isInvalid(name): boolean {
    const input = this.candidateForm.get(name);
    return input.dirty && input.invalid;
  }

  parseErrors(errors: any): void {
    errors.detail?.forEach((error) => {
      const field = this.candidateForm.get(error.fieldName);
      if (field) {
        field.markAsDirty();
        field.setErrors({ required: true });
        this.messages.push(error.message);
      }
    });
  }
}
