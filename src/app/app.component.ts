import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './shared/service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Candidates App';

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.populate();
  }
}
