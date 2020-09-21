import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  @Input() messages: string[] = [];
  @Input() title: string;

  constructor() {}

  ngOnInit(): void {}

  hasMessages(): boolean {
    return this.messages.length > 0;
  }
}
