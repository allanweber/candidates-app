import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { ErrorMessagesComponent } from './components/error-messages/error-messages.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [ErrorMessagesComponent, NavBarComponent],
  imports: [CommonModule, RouterModule, ToastrModule.forRoot()],
  exports: [ErrorMessagesComponent, NavBarComponent],
})
export class SharedModule {}
