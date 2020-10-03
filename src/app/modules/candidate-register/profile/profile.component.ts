import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { VacancyView } from 'src/app/shared/model/vacancy-view.mode';
import { CandidateRegisterProfile } from './../../../shared/model/candidate-register-profile.model';
import { FeedbackMessageService } from './../../../shared/service/feedback-message.service';
import { AccessTokenStorageService } from './../service/access-token-storage.service';
import { CandidateRegisterService } from './../service/candidate-register.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: CandidateRegisterProfile;
  showErrorModal = false;
  vacancy: VacancyView;

  constructor(
    private router: Router,
    private accessTokenStorageService: AccessTokenStorageService,
    private candidateRegisterService: CandidateRegisterService,
    private feedbackMessage: FeedbackMessageService
  ) {}

  ngOnInit(): void {
    if (
      !this.accessTokenStorageService.hasToken() ||
      !this.accessTokenStorageService.isValid()
    ) {
      this.navigateInvalid();
    }

    this.candidateRegisterService
      .getVacancy()
      .pipe(take(1))
      .subscribe(
        (response) => (this.vacancy = response),
        () => this.navigateInvalid()
      );

    this.candidateRegisterService
      .getProfile()
      .pipe(take(1))
      .subscribe(
        (response) => (this.profile = response),
        () => this.navigateInvalid()
      );
  }

  toggleModal(): void {
    this.showErrorModal = !this.showErrorModal;
  }

  save(profile: CandidateRegisterProfile): void {
    this.candidateRegisterService
      .saveProfile(profile)
      .pipe(take(1))
      .subscribe(
        () => {
          this.accessTokenStorageService.remove();
          this.router.navigate(['/candidate-register/sent']);
        },
        (err) => {
          console.log(err);
          if (err.status === 403) {
            this.router.navigate(['/candidate-register/invalid']);
          } else {
            this.feedbackMessage.showErrorMessage(err.error.message);
          }
        }
      );
  }

  private navigateInvalid(): void {
    this.router.navigate(['/candidate-register/invalid']);
  }
}
