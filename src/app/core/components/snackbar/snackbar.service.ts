import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private snackBar: MatSnackBar) {}

  showMessage(message: string, action: string = '', duration = 1500) {
    this.snackBar.open(message, action, {
      duration,
    });
  }
}
