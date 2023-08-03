import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InviteRoutingModule } from './invite-routing.module';
import { FullNamePipe } from 'src/app/shared/pipes/name.pipe';
import { TreeComponent } from './tree/tree.component';
import { SeparatorComponent } from '../../shared/components/separator/separator.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, InviteRoutingModule, FullNamePipe],
})
export class InviteModule {}
