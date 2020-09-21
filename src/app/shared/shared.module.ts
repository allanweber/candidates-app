import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [MessagesComponent],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    MessagesComponent
  ]
})
export class SharedModule { }
