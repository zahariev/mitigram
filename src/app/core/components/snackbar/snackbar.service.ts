import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  delay,
  interval,
  map,
  race,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private showMessage$: BehaviorSubject<string> = new BehaviorSubject('');

  getInstance(): Observable<string> {
    return this.showMessage$.asObservable();
  }

  showMessage(msg: string): void {
    this.showMessage$.next(msg);
  }

  hide(): void {
    this.showMessage$.next('');
  }
}
