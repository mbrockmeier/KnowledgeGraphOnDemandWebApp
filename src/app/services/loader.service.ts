import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from '../interfaces/loader-state';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new Subject<LoaderState>();
  requests: number;

  loaderState = this.loaderSubject.asObservable();

  constructor() {
    this.requests = 0;
  }

  show(): void {
    if (this.requests === 0) {
      this.loaderSubject.next({show: true} as LoaderState);
    }
    this.requests++;
  }

  hide(): void {
    if (this.requests > 0) {
      this.requests--;
    }
    if (this.requests === 0) {
      this.loaderSubject.next({show: false} as LoaderState);
    }
  }
}
