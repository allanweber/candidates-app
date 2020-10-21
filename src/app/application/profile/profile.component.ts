import { DenyReason } from './../model/deny-reason.model';
import { DenyOptionComponent } from './../deny-option/deny-option.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CandidateProfile } from '../../shared/model/candidate-profile.model';
import { VacancyView } from '../model/vacancy-view.model';
import { CandidateApplicationService } from '../service/candidate-application.service';
import { VacancyViewService } from '../service/vacancy-view.service';
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
  applicationId: string;

  @ViewChild(DenyOptionComponent, { static: false })
  denyComponent: DenyOptionComponent;

  constructor(
    private router: Router,
    private accessTokenStorageService: AccessTokenStorageService,
    private candidateApplicationService: CandidateApplicationService,
    private vacancyViewService: VacancyViewService
  ) {}

  ngOnInit(): void {
    if (
      !this.accessTokenStorageService.hasToken() ||
      !this.accessTokenStorageService.isValid()
    ) {
      this.navigateInvalid();
    } else {
      this.applicationId = this.accessTokenStorageService.getToken.applicationId;
    }

    this.vacancyViewService
      .getVacancy(this.applicationId)
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

  deny(): void {
    this.denyComponent.toggleModal();
  }

  reasonSelected(reason: DenyReason): void {
    this.candidateApplicationService
      .deny(this.applicationId, reason)
      .pipe(take(1))
      .subscribe(() => this.router.navigate(['/candidate-application/denied']));
  }

  private navigateInvalid(): void {
    this.router.navigate(['/candidate-application/invalid']);
  }
}
