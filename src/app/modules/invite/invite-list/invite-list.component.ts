import { CommonModule } from '@angular/common';
import { Component, Output, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FullNamePipe } from 'src/app/shared/pipes/name.pipe';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-invite-list',
  templateUrl: './invite-list.component.html',
  styleUrls: ['./invite-list.component.scss'],
  imports: [CommonModule, MatButtonModule, FullNamePipe],
  standalone: true,
})
export class InviteListComponent {
  @Output() notEmpty: boolean = false;

  constructor(public data: DataService) {
    effect(() => {
      this.notEmpty = this.data.invitedContacts().size > 0;
    });
  }

  sendInvitations() {
    console.log(this.data.invitedContacts());
  }

  removeInvitation(contact: any) {
    this.data.removeInvitation(contact);
  }
}
