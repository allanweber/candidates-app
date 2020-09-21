import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.scss'],
})
export class ErrorMessagesComponent implements OnInit {
  @Input() messages: string[] = [];
  @Input() title: string;

  constructor() {}

  ngOnInit(): void {}

  hasMessages(): boolean {
    return this.messages.length > 0;
  }
}
