import { InvitationService } from './services/invitation.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FullNamePipe } from 'src/app/shared/pipes/name.pipe';
import { DataService } from 'src/app/shared/services/data.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { ListComponent } from './list/list.component';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { AddressBookService } from 'src/app/shared/services/address-book.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  imports: [
    CommonModule,
    FullNamePipe,
    MatTabsModule,
    MatButtonModule,
    ListComponent,
    SearchComponent,
  ],
  standalone: true,
})
export class InviteComponent {
  constructor(
    public invitationService: InvitationService,
    public addressBookService: AddressBookService
  ) {}

  invite(contact: any) {
    this.invitationService.invite(contact);
  }

  inviteGroup(group: any) {
    this.invitationService.inviteGroup(group);
  }

  filterContacts(value: string) {
    this.addressBookService.onSearch(value);
  }
}
