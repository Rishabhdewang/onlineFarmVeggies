import {Injectable, OnDestroy} from '@angular/core';
import {fromEvent, Observable, Subscription} from 'rxjs';


@Injectable({providedIn: 'root'})
export class NetworkService implements OnDestroy {
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;

  subscriptions: Subscription[] = [];

  online;
  isActive: boolean;

  constructor() {

    this.online = window.navigator.onLine;

    /**
     * Get the online/offline status from browser window
     */
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      console.log('online');
      this.online = true;
    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      console.log('offline');
      this.online = false;
    }));
  }

  ngOnDestroy(): void {
    /**
     * Unsubscribe all subscriptions to avoid memory leak
     */
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
