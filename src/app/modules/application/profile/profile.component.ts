import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { VacancyView } from 'src/app/shared/model/vacancy-view.mode';
import { CandidateProfile } from '../../../shared/model/candidate-profile.model';
import { CandidateApplicationService } from '../service/candidate-application.service';
import { AccessTokenStorageService } from './../service/access-token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: CandidateProfile;
  showErrorModal = false;
  vacancy: VacancyView;

  constructor(
    private router: Router,
    private accessTokenStorageService: AccessTokenStorageService,
    private candidateApplicationService: CandidateApplicationService
  ) {}

  ngOnInit(): void {
    if (
      !this.accessTokenStorageService.hasToken() ||
      !this.accessTokenStorageService.isValid()
    ) {
      this.navigateInvalid();
    }

    this.candidateApplicationService
      .getVacancy()
      .pipe(take(1))
      .subscribe(
        (response) => (this.vacancy = response),
        () => this.navigateInvalid()
      );

    this.candidateApplicationService
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

  save(profile: CandidateProfile): void {
    this.candidateApplicationService
      .saveProfile(profile)
      .pipe(take(1))
      .subscribe(
        () => {
          this.accessTokenStorageService.remove();
          this.router.navigate(['/candidate-application/sent']);
        },
        (err) => {
          if (err.status === 403) {
            this.router.navigate(['/candidate-application/invalid']);
          }
        }
      );
  }

  private navigateInvalid(): void {
    this.router.navigate(['/candidate-application/invalid']);
  }
}
