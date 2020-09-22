import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Vacancy } from '../model/vacancy.model';
import { VacanciesService } from '../service/vacancies.service';
import { FeedbackMessageService } from './../../../shared/service/feedback-message.service';
import { Skill } from './../model/skill.model';

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
    skills: this.builder.array([]),
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
      } else {
        this.addItem();
      }
    });
  }

  getControls(): any {
    return (this.vacancyForm.get('skills') as FormArray).controls;
  }

  removeItem(i: number): void {
    this.items = this.vacancyForm.get('skills') as FormArray;
    this.items.removeAt(i);
  }

  addItem(): void {
    this.items = this.vacancyForm.get('skills') as FormArray;
    this.items.push(this.createItem());
  }

  createItem(): FormGroup {
    return this.builder.group({
      name: ['', [Validators.required]],
    });
  }

  load(response: Vacancy): void {
    const formData = {
      id: response.id,
      name: response.name,
    };
    this.vacancyForm.patchValue(formData);
    this.loadSkills(response.skills);
  }

  loadSkills(skills: Skill[]): void {
    skills.forEach((skill) => {
      this.items = this.vacancyForm.get('skills') as FormArray;
      this.items.push(
        this.builder.group({
          name: skill.name,
        })
      );
    });
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
