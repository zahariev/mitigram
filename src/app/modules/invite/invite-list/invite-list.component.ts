import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  constructor(public data: DataService) {}

  sendInvitations() {
    console.log(this.data.invitedContacts());
  }
}
