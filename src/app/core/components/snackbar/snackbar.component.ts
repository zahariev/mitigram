import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SnackbarService } from './snackbar.service';
import { EMPTY, Observable, delay, filter, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // standalone: true,
  // imports: [MatButtonModule, TranslateModule, CommonModule],
})
export class SnackbarComponent implements OnInit {
  msgInstance$: Observable<string> = EMPTY;
  test$: any;
  constructor(private readonly snackbarService: SnackbarService) {}

  ngOnInit(): void {
    //   this.msgInstance$ = this.snackbarService.getInstance();
    //   this.test$ = this.msgInstance$
    //     .pipe(
    //       filter((v) => !!v),
    //       delay(2500),
    //       tap(() => this.snackbarService.hide())
    //     )
    //     .subscribe();
  }
}
