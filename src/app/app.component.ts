import { FeedbackMessageService } from './shared/shared/service/feedback-message.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Candidates App';

  constructor(private messageService: FeedbackMessageService) {}

  message(): void {
    this.messageService.showSuccessMessage('Any message');
  }
}
