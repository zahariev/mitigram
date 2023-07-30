import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';
import { HeaderComponent } from './header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DrawerComponent } from './drawer/drawer.component';
import { TreeMenuComponent } from './tree-menu/tree-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { InviteListComponent } from 'src/app/modules/invite/invite-list/invite-list.component';

@NgModule({
  declarations: [DefaultComponent],
  imports: [
    CommonModule,
    DefaultRoutingModule,
    HeaderComponent,
    MatSidenavModule,
    DrawerComponent,
    TreeMenuComponent,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    TranslateModule,
    InviteListComponent,
  ],
})
export class DefaultModule {}
