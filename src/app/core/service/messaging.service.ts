import { filter, map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

interface Message {
  channel: string;
  data: any;
}

@Injectable()
export class MessagingService {
  private message$: Subject<Message>;

  constructor() {
    this.message$ = new Subject<Message>();
  }

  public publish<T>(messageType: new (...args: any[]) => T, message: T): void {
    const myChannel = (messageType as any).name;
    this.message$.next({ channel: myChannel, data: message });
  }

  public of<T>(messageType: new (...args: any[]) => T): Observable<T> {
    const channel = (messageType as any).name;
    return this.message$.pipe(
      filter((m) => m.channel === channel),
      map((m) => m.data)
    );
  }
}
