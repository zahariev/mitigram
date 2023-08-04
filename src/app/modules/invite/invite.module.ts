import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InviteRoutingModule } from './invite-routing.module';
import { FullNamePipe } from 'src/app/shared/pipes/name.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [CommonModule, InviteRoutingModule, FullNamePipe],
  providers: [],
})
export class InviteModule {}
