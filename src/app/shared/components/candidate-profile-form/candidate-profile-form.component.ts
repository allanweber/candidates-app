import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,

  ViewChildren
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { CandidateExperience } from '../../model/candidate-experience.model';
import { Skill } from '../../model/skill.model';
import { CandidateRegisterProfile } from './../../model/candidate-register-profile.model';
import { FeedbackMessageService } from './../../service/feedback-message.service';

@Component({
  selector: 'app-candidate-profile-form',
  templateUrl: './candidate-profile-form.component.html',
  styleUrls: ['./candidate-profile-form.component.scss'],
})
export class CandidateProfileFormComponent
  implements OnChanges, AfterViewChecked {
  @Input() profile: CandidateRegisterProfile;
  @Output() changed: EventEmitter<CandidateRegisterProfile> = new EventEmitter<
    CandidateRegisterProfile
  >();
  @ViewChildren('companyName') companyNameFields: QueryList<ElementRef>;

  experiences: FormArray;

  public candidateForm = this.builder.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    location: ['', [Validators.required, Validators.minLength(5)]],
    bio: ['', [Validators.required, Validators.minLength(10)]],
    experiences: this.builder.array([]),
  });

  constructor(
    private cdr: ChangeDetectorRef,
    private builder: FormBuilder,
    private feedbackMessage: FeedbackMessageService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.profile.currentValue) {
      this.loadProfile();
    }
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  loadProfile(): void {
    const formData = {
      name: this.profile.name,
      location: this.profile.location,
      bio: this.profile.bio,
    };
    this.candidateForm.patchValue(formData);
    this.loadExperiences();
  }

  save(): void {
    if (this.candidateForm.invalid) {
      this.feedbackMessage.showWarningMessage('Dados informados são inválidos');
      return;
    }

    this.changed.emit(this.candidateForm.value);
  }

  isInvalid(name): boolean {
    const input = this.candidateForm.get(name);
    return input.dirty && input.invalid;
  }

  isInvalidExp(index: number, name: string): boolean {
    const input = this.getExperienceFormField(index, name);
    return input.dirty && input.invalid;
  }

  getSkills(index: number): Skill[] {
    const skills = this.getExperienceFormField(index, 'skills').value;
    return skills;
  }

  addSkill(experienceIndex: number, skillInput: HTMLInputElement): void {
    const skillName = skillInput.value;
    if (!skillName || skillName.trim() === '') {
      return;
    }
    const skills = this.getExperienceFormField(experienceIndex, 'skills');
    let skillsCurrentValues = skills.value;
    if (!skillsCurrentValues) {
      skillsCurrentValues = [];
    }
    const skillValues = skillName.split(/,|;/).filter(x => x.trim());

    skillValues.forEach(skill => skillsCurrentValues.push({ name: skill }));
    skills.patchValue(skillsCurrentValues);
    skillInput.value = '';
    skillInput.focus();
  }

  removeSkill(experienceIndex: number, skillName: string): void {
    const skills = this.getExperienceFormField(experienceIndex, 'skills');
    const skillsValues = skills.value;
    const newSkills = skillsValues.filter((skill) => skill.name !== skillName);
    skills.patchValue(newSkills);
  }

  getControls(): any {
    return (this.candidateForm.get('experiences') as FormArray).controls;
  }


  addExperience(): void {
    this.experiences = this.candidateForm.get('experiences') as FormArray;
    this.experiences.push(this.createExperience());
    setTimeout(() => {
      this.companyNameFields.last.nativeElement.focus();
    }, 10);
  }

  removeExperience(index: number): void {
    this.experiences = this.candidateForm.get('experiences') as FormArray;
    this.experiences.removeAt(index);
    if (this.experiences.length < 1) {
      this.addExperience();
    }
  }

  private getExperienceFormField(index: number, name: string): FormControl {
    return (this.candidateForm.get('experiences') as FormArray).controls[
      index
    ].get(name) as FormControl;
  }

  private loadExperiences(): void {
    if (!this.profile.experiences) {
      this.profile.experiences = [new CandidateExperience()];
    }

    this.profile.experiences.forEach((exp) => {
      this.experiences = this.candidateForm.get('experiences') as FormArray;
      this.experiences.push(
        this.builder.group({
          companyName: exp.companyName,
          companyLocation: exp.companyLocation,
          position: exp.position,
          start: exp.start,
          end: exp.end,
          description: exp.description,
          skills: [exp.skills],
        })
      );
    });
  }

  private createExperience(): FormGroup {
    return this.builder.group({
      companyName: ['', [Validators.required]],
      companyLocation: ['', [Validators.required]],
      position: ['', [Validators.required]],
      start: ['', [Validators.required]],
      end: [''],
      description: ['', [Validators.required]],
      skills: [null],
    });
  }
}