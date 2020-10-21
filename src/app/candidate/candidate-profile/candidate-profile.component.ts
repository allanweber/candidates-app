import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CandidateProfile } from '../../shared/model/candidate-profile.model';
import { FeedbackMessageService } from './../../shared/service/feedback-message.service';
import { CandidatesService } from './../service/candidates.service';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.scss'],
})
export class CandidateProfileComponent implements OnInit {
  candidateProfile: CandidateProfile;
  image: any;
  experiencesVisible = true;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private candidatesService: CandidatesService,
    private feedbackMessage: FeedbackMessageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(take(1)).subscribe((params) => {
      if (params.id) {
        this.loadCandidate(params.id);
      }
    });
  }

  toggleExperiences(): void {
    this.experiencesVisible = !this.experiencesVisible;
  }

  private loadCandidate(id: string): void {
    this.candidatesService
      .getProfile(id)
      .pipe(take(1))
      .subscribe(
        (response) => {
          this.candidateProfile = response;
          this.loadImage(id);
        },
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

  private loadImage(id: string): void {
    this.candidatesService
      .getImageBase64(id)
      .pipe(take(1))
      .subscribe((imageBase64) => {
        if (imageBase64) {
          this.image = this.sanitizer.bypassSecurityTrustResourceUrl(
            `data:image/jpg;base64,${imageBase64}`
          );
        } else {
          this.image = null;
        }
      });
  }
}
