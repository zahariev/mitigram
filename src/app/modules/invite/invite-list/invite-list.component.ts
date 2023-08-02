import { CommonModule } from '@angular/common';
import { Component, Output, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FullNamePipe } from 'src/app/shared/pipes/name.pipe';
import { DataService } from 'src/app/shared/services/data.service';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-invite-list',
  templateUrl: './invite-list.component.html',
  styleUrls: ['./invite-list.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    FullNamePipe,
    MatIconModule,
    ListComponent,
  ],
  standalone: true,
})
export class InviteListComponent {
  constructor(public data: DataService) {}

  sendInvitations() {
    console.log(this.data.invitedContacts());
  }

  removeInvitation(contact: any) {
    this.data.removeInvitation(contact);
  }
}
