import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ApplicationResponse } from '../../../shared/model/application-response.model';
import { ApplicationsService } from '../../..//shared/service/applications.service';
import { ApplicationUtilities } from '../../../shared/model/application-utilities.model';
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
  applications$: Observable<ApplicationResponse[]>;
  items: FormArray;
  showErrorModal = false;

  public vacancyForm = this.builder.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    skills: [null, [Validators.required]],
    remote: [false],
    location: [''],
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private builder: FormBuilder,
    private vacancyService: VacanciesService,
    private messageService: FeedbackMessageService,
    private applicationsService: ApplicationsService,
    private feedbackMessage: FeedbackMessageService
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

      this.locationValidation();
    });
  }

  private loadApplications(): void {
    this.applications$ = this.applicationsService
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
      remote: response.remote,
      location: response.location,
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

  getStatusColor(application: ApplicationResponse): string {
    return ApplicationUtilities.getStatusColor(application.status);
  }

  toggleModal(): void {
    this.showErrorModal = !this.showErrorModal;
  }

  canTryAgain(application: ApplicationResponse): boolean {
    return application.status !== 'DONE';
  }

  sendAgain(application: ApplicationResponse): void {
    this.sendRequest(application);
  }

  changeRemote(): void {
    this.vacancyForm.get('location').setValue('');
  }

  get showLocation(): boolean {
    return !this.vacancyForm.get('remote').value;
  }

  private locationValidation(): void {
    const location = this.vacancyForm.get('location');
    this.vacancyForm.get('remote').valueChanges.subscribe((value) => {
      if (value) {
        location.setValidators(null);
      } else {
        location.setValidators([Validators.required, Validators.minLength(5)]);
      }
    });
  }

  private sendRequest(application: ApplicationResponse): void {
    this.applicationsService
      .sendApplication(application.candidate.id, this.vacancyId)
      .pipe(take(1))
      .subscribe(() => {
        this.loadApplications();
        this.feedbackMessage.showSuccessMessage(
          'Email com a solicitação foi enviado para candidato'
        );
      });
  }
}
