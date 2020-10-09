import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-view',
  templateUrl: './date-view.component.html',
  styleUrls: ['./date-view.component.scss'],
})
export class DateViewComponent implements OnInit {
  @Input() start: Date;
  @Input() end: Date;
  @Input() classes: string;

  constructor() {}

  ngOnInit(): void {}

  calculateDates(startValue: any, endValue: any): string {
    const start = new Date(startValue);
    let end = null;
    if (!endValue) {
      end = new Date();
    } else {
      end = new Date(endValue);
    }
    const diff = Math.floor(end.getTime() - start.getTime());
    const day = 1000 * 60 * 60 * 24;

    const days = Math.floor(diff / day);
    const months = Math.floor(days / 31);
    const years = Math.floor(months / 12);

    let message;
    if (years > 0) {
      message = `${years} ano${years > 1 ? 's' : ''}`;
    }

    const realMonths = months % 12;
    if (realMonths > 0) {
      if (message) {
        message = `${message} e `;
      } else {
        message = '';
      }
      message = `${message}${realMonths} ${realMonths > 1 ? 'meses' : 'mês'}`;
    }

    return message;
  }
}
