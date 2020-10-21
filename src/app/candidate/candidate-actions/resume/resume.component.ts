import { Component, Input, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { take } from 'rxjs/operators';
import { ResumeResponse } from './../../../shared/model/resume-response.model';
import { FeedbackMessageService } from './../../../shared/service/feedback-message.service';
import { CandidatesService } from './../../service/candidates.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent implements OnInit {
  @Input() candidateId: string;
  candidateResume: ResumeResponse;

  constructor(
    private candidatesService: CandidatesService,
    private feedbackMessage: FeedbackMessageService
  ) {}

  ngOnInit(): void {
    this.candidatesService
      .getResumeInfo(this.candidateId)
      .pipe(take(1))
      .subscribe((response) => (this.candidateResume = response));
  }

  download(): void {
    this.candidatesService
      .getResume(this.candidateId)
      .pipe(take(1))
      .subscribe((file) => saveAs(file, this.candidateResume.fileName));
  }

  upload(files: FileList): void {
    if (files.item(0)) {
      this.candidatesService
        .uploadResume(this.candidateId, files.item(0))
        .pipe(take(1))
        .subscribe((response) => {
          this.candidateResume = response;
          this.feedbackMessage.showSuccessMessage(
            'Currículo salvo com sucesso.'
          );
        });
    }
  }
}
