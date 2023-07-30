import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InviteRoutingModule } from './invite-routing.module';
import { FullNamePipe } from 'src/app/shared/pipes/name.pipe';

@NgModule({
  declarations: [],
  imports: [CommonModule, InviteRoutingModule, FullNamePipe],
})
export class InviteModule {}
