import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InviteRoutingModule } from './invite-routing.module';
import { FullNamePipe } from 'src/app/shared/pipes/name.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/core/components/snackbar/snackbar.component';

@NgModule({
  declarations: [SnackbarComponent],
  imports: [CommonModule, InviteRoutingModule, FullNamePipe],
  providers: [],
  exports: [SnackbarComponent],
})
export class InviteModule {}
