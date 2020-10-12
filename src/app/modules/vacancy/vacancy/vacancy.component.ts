import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { VacancyApplication } from 'src/app/shared/model/vacancy-application.model';
import { ApplicationsService } from 'src/app/shared/service/applications.service';
import { Skill } from '../../../shared/model/skill.model';
import { VacanciesService } from '../../../shared/service/vacancies.service';
import { Vacancy } from '../model/vacancy.model';
import { FeedbackMessageService } from './../../../shared/service/feedback-message.service';

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss'],
})
export class VacancyComponent implements OnInit {
  vacancyId: string;
  messages: string[] = [];
  vacancyApplications$: Observable<VacancyApplication[]>;
  items: FormArray;
  showErrorModal = false;

  public vacancyForm = this.builder.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    skills: [null, [Validators.required]],
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private builder: FormBuilder,
    private vacancyService: VacanciesService,
    private messageService: FeedbackMessageService,
    private applicationsService: ApplicationsService,
    private feedbackMessage: FeedbackMessageService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(take(1)).subscribe((params) => {
      if (params.id) {
        this.vacancyId = params.id;
        this.vacancyService
          .get(this.vacancyId)
          .pipe(take(1))
          .subscribe(
            (response) => {
              this.load(response);
              this.loadApplications();
            },
            (err) => {
              if (err.status === 404) {
                this.messageService.showWarningMessage(
                  'Vaga é inválida. Algum usuário pode ter excluído essa vaga.'
                );
                this.router.navigate(['/vacancies']);
              }
            }
          );
      }
    });
  }

  private loadApplications(): void {
    this.vacancyApplications$ = this.applicationsService
      .getVacancyApplications(this.vacancyId)
      .pipe(take(1));
  }

  getSkills(): Skill[] {
    const skills = this.vacancyForm.get('skills').value;
    return skills;
  }

  changeSkills(skills: Skill[]): void {
    this.vacancyForm.get('skills').setValue(skills);
  }

  load(response: Vacancy): void {
    const formData = {
      id: response.id,
      name: response.name,
      description: response.description,
      skills: response.skills,
    };
    this.vacancyForm.patchValue(formData);
  }

  save(): void {
    if (this.vacancyForm.invalid) {
      this.messageService.showWarningMessage('Dados informados são inválidos');
      return;
    }

    this.vacancyService
      .save(this.vacancyForm.value)
      .pipe(take(1))
      .subscribe(
        () => {
          this.messageService.showSuccessMessage('Vaga salva com sucesso');
          this.router.navigate(['/vacancies']);
        },
        (err) => {
          this.parseErrors(err.error);
        }
      );
  }

  isInvalid(name): boolean {
    const input = this.vacancyForm.get(name);
    return input.dirty && input.invalid;
  }

  parseErrors(errors: any): void {
    errors.detail?.forEach((error) => {
      const field = this.vacancyForm.get(error.fieldName);
      if (field) {
        field.markAsDirty();
        field.setErrors({ required: true });
        this.messages.push(error.message);
      }
    });
  }

  getStatusColor(application: VacancyApplication): string {
    const status = application.status;
    if (status === 'PENDING') {
      return 'hsl(0, 0%, 4%)';
    } else if (status === 'ACCEPTED') {
      return 'hsl(204, 86%, 53%)';
    } else if (status === 'DONE') {
      return 'hsl(141, 71%, 48%)';
    } else if (status === 'ERROR') {
      return 'hsl(348, 100%, 61%)';
    } else if (status === 'DENIED') {
      return 'hsl(48, 100%, 67%)';
    } else {
      return status;
    }
  }

  toggleModal(): void {
    this.showErrorModal = !this.showErrorModal;
  }

  canTryAgain(application: VacancyApplication): boolean {
    return application.status !== 'DONE';
  }

  sendAgain(application: VacancyApplication): void {
    this.sendRequest(application);
  }

  private sendRequest(application: VacancyApplication): void {
    this.applicationsService
      .sendApplication(application.candidateId, this.vacancyId)
      .pipe(take(1))
      .subscribe(() => {
        this.loadApplications();
        this.feedbackMessage.showSuccessMessage('Email com a solicitação foi enviado para candidato');
      });
  }
}
