import { InvitationService } from './services/invitation.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FullNamePipe } from 'src/app/shared/pipes/name.pipe';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { ListComponent } from './list/list.component';
import { SearchComponent } from 'src/app/core/components/search/search.component';
import { AddressBookService } from 'src/app/shared/services/address-book.service';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from 'src/app/core/components/button/button.component';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TreeMenuComponent } from 'src/app/layouts/default/tree-menu/tree-menu.component';
import { TREE_DATA } from 'src/app/layouts/default/models/main';
import { TreeComponent } from 'src/app/core/components/tree/tree.component';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  imports: [
    CommonModule,
    TranslateModule,
    FullNamePipe,
    MatTabsModule,
    MatButtonModule,
    ListComponent,
    SearchComponent,
    ButtonComponent,
    MatSnackBarModule,
    TreeComponent,
  ],
  standalone: true,
})
export class InviteComponent {
  selection: string[] = [];
  constructor(
    private _snackBar: MatSnackBar,
    public invitationService: InvitationService,
    public addressBookService: AddressBookService
  ) {}

  invite(contact: any) {
    this.invitationService.invite(contact);
    // this.openSnackBar('Successfully added user', '');
  }

  inviteSelectedContacts() {
    this.invitationService.inviteSelectedContacts(this.selection);
  }

  setSelection(contacts: any[]) {
    console.log(contacts);

    this.selection = contacts.map((contact) => contact.email);
  }
  filterContacts(value: string) {
    this.addressBookService.onSearch(value);
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1500,
      panelClass: ['snackbar'],
    });
  }
  trackById(index: number, item: any): any {
    return item.key;
  }
}
