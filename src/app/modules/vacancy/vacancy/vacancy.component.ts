import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Vacancy } from '../model/vacancy.model';
import { VacanciesService } from '../../../shared/service/vacancies.service';
import { FeedbackMessageService } from './../../../shared/service/feedback-message.service';
import { Skill } from '../../../shared/model/skill.model';

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss'],
})
export class VacancyComponent implements OnInit {
  vacancyId: string;
  messages: string[] = [];
  items: FormArray;

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
    private messageService: FeedbackMessageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(take(1)).subscribe((params) => {
      if (params.id) {
        this.vacancyId = params.id;
        this.vacancyService
          .get(this.vacancyId)
          .pipe(take(1))
          .subscribe(
            (response) => this.load(response),
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

  getSkills(): Skill[] {
    const skills = this.vacancyForm.get('skills').value;
    return skills;
  }

  changeSkills(skills: Skill[]): void {
    this.vacancyForm.get('skills').setValue(skills);
    console.log(this.vacancyForm.get('skills').value);
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
}
