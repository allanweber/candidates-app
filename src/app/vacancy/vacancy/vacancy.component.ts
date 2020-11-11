import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ApplicationResponse } from '../../shared/model/application-response.model';
import { ApplicationUtilities } from '../../shared/model/application-utilities.model';
import { Skill } from '../../shared/model/skill.model';
import { Vacancy } from '../../shared/model/vacancy.model';
import { ApplicationsService } from '../../shared/service/applications.service';
import { VacanciesService } from '../../shared/service/vacancies.service';
import { FeedbackMessageService } from './../../shared/service/feedback-message.service';
@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss'],
})
export class VacancyComponent implements OnInit {
  vacancyId: string;
  vacancy: Vacancy;
  messages: string[] = [];
  applications$: Observable<ApplicationResponse[]>;
  items: FormArray;
  showErrorModal = false;
  isSpecificSalary = true;

  nonTrimProperty = ['salary', 'skills', 'remote'];

  public vacancyForm = this.builder.group({
    id: [''],
    name: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(128)],
    ],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10000),
      ],
    ],
    skills: [null, [Validators.required]],
    remote: [false],
    location: ['', Validators.maxLength(128)],
    salary: this.builder.group({
      from: [0],
      to: [0],
      visible: [false],
    }),
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
    this.vacancy = response;
    const formData = {
      id: this.vacancy.id,
      name: this.vacancy.name,
      description: this.vacancy.description,
      skills: this.vacancy.skills,
      remote: this.vacancy.remote,
      location: this.vacancy.location,
      salary: {
        from: this.vacancy.salary?.from,
        to: this.vacancy.salary?.to,
        visible: this.vacancy.salary?.visible,
      },
    };
    this.vacancyForm.patchValue(formData);
    this.loadRadios();
  }

  loadRadios(): void {
    if (this.vacancy.salary) {
      this.isSpecificSalary =
        this.vacancy.salary?.from > 0 && this.vacancy.salary?.to === 0;
    } else {
      this.isSpecificSalary = true;
    }
  }

  salaryType(isSpecific): void {
    this.isSpecificSalary = isSpecific;
    if (this.isSpecificSalary) {
      this.getSalaryForm.get('to').setValue(0);
    }
  }

  save(): void {
    if (this.vacancyForm.invalid) {
      this.messageService.showWarningMessage('Dados informados são inválidos');
      return;
    }

    const vacancy = this.vacancyForm.value;
    Object.keys(vacancy).map((key) => {
      if (!this.nonTrimProperty.includes(key)) {
        vacancy[key] = vacancy[key]?.trim();
      }
    });

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

  private get getSalaryForm(): FormGroup {
    return this.vacancyForm.get('salary') as FormGroup;
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
