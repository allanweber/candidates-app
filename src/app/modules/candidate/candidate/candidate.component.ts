import { MessagingService } from './../../../core/service/messaging.service';
import { Candidate } from './../model/candidate.mode';
import { take } from 'rxjs/operators';
import { FeedbackMessageService } from './../../../shared/service/feedback-message.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidatesService } from './../service/candidates.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss'],
})
export class CandidateComponent implements OnInit {
  messages: string[] = [];
  candidate: Candidate;

  public candidateForm = this.builder.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    location: ['', [Validators.required, Validators.minLength(5)]],
    bio: ['', [Validators.required, Validators.minLength(10)]],
    currentCompany: '',
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private builder: FormBuilder,
    private candidatesService: CandidatesService,
    private feedbackMessage: FeedbackMessageService,
    private messagingService: MessagingService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(take(1)).subscribe((params) => {
      if (params.id) {
        this.loadCandidate(params.id);
      }
    });
    this.messagingService
      .of(Candidate)
      .subscribe((candidate) => this.loadCandidate(candidate.id));
  }

  private loadCandidate(id: string): void {
    this.candidatesService
      .get(id)
      .pipe(take(1))
      .subscribe(
        (response) => this.load(response),
        (err) => {
          if (err.status === 404) {
            this.feedbackMessage.showWarningMessage(
              'Candidato é inválido. Algum usuário pode ter excluído ele.'
            );
            this.router.navigate(['/candidates']);
          }
        }
      );
  }

  load(response: Candidate): void {
    this.candidate = response;
    const formData = {
      id: response.id,
      name: response.name,
      email: response.email,
      location: response.location,
      bio: response.bio,
      currentCompany: response.currentCompany,
    };
    this.candidateForm.patchValue(formData);
  }

  save(): void {
    if (this.candidateForm.invalid) {
      this.feedbackMessage.showWarningMessage('Dados informados são inválidos');
      return;
    }

    this.candidatesService
      .update(this.candidateForm.value)
      .pipe(take(1))
      .subscribe(
        () => {
          this.feedbackMessage.showSuccessMessage(
            'Candidato salva com sucesso'
          );
          this.router.navigate(['/candidates']);
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
