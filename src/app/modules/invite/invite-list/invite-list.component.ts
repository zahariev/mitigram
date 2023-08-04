import { InvitationService } from './../services/invitation.service';
import { CommonModule } from '@angular/common';
import { Component, Output, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FullNamePipe } from 'src/app/shared/pipes/name.pipe';
import { ListComponent } from '../list/list.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from 'src/app/core/components/button/button.component';
import { EmailComponent } from '../email/email.component';
import { SeparatorComponent } from 'src/app/core/components/separator/separator.component';
import { SearchComponent } from 'src/app/core/components/search/search.component';

@Component({
  selector: 'app-invite-list',
  templateUrl: './invite-list.component.html',
  styleUrls: ['./invite-list.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    FullNamePipe,
    MatIconModule,
    TranslateModule,
    ListComponent,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ButtonComponent,
    EmailComponent,
    SeparatorComponent,
    SearchComponent,
  ],
  standalone: true,
})
export class InviteListComponent {
  constructor(public invitationService: InvitationService) {}

  sendInvitations() {
    console.log(this.invitationService.invitedContacts());
  }

  removeInvitation(contact: any) {
    this.invitationService.removeInvitation(contact);
  }
  clearAllInvitations() {
    this.invitationService.clearAllInvitations();
  }

  inviteByMail(email: string) {
    console.log(email);

    this.invitationService.inviteByMail(email);
  }
}
