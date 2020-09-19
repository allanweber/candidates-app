import { FeedbackMessageService } from './shared/service/feedback-message.service';
import { Component } from '@angular/core';
import { CareerHealthService } from './shared/service/career-health.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Candidates App';

  constructor(
    private messageService: FeedbackMessageService,
    private careerService: CareerHealthService
  ) {}

  message(): void {
    this.careerService
      .getHealth()
      .subscribe((response) =>
        this.messageService.showSuccessMessage(response.status)
      );
  }
}
