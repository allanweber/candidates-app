import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { take } from 'rxjs/operators';
import { CandidatesService } from './../../service/candidates.service';

@Component({
  selector: 'app-candidate-image',
  templateUrl: './candidate-image.component.html',
  styleUrls: ['./candidate-image.component.scss'],
})
export class CandidateImageComponent implements OnInit {
  @Input() candidateId: string;
  image: any;

  constructor(
    private sanitizer: DomSanitizer,
    private candidatesService: CandidatesService
  ) {}

  ngOnInit(): void {
    this.candidatesService
      .getImageBase64(this.candidateId)
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
