import { RefreshTokenService } from './../../../core/service/refresh-token.service';
import { AuthenticationService } from './../../../core/service/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public showNav: boolean;
  public userName: string;

  constructor(
    private authService: AuthenticationService,
    private refreshToken: RefreshTokenService
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe((e) => (this.showNav = e));

    this.authService.currentUser.subscribe(
      (user) => (this.userName = user.name)
    );
  }

  logout(): void {
    this.refreshToken.stop();
    this.authService.logout();
  }
}
