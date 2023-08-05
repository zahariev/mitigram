import { InvitationService } from './../services/invitation.service';
import { CommonModule } from '@angular/common';
import { Component, Inject, Output, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FullNamePipe } from 'src/app/shared/pipes/name.pipe';
import { ListComponent } from '../list/list.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from 'src/app/core/components/button/button.component';
import { SeparatorComponent } from 'src/app/core/components/separator/separator.component';
import { SearchComponent } from 'src/app/core/components/search/search.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/core/components/dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/core/components/snackbar/snackbar.service';
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
    SeparatorComponent,
    SearchComponent,
    MatDialogModule,
  ],
  standalone: true,
})
export class InviteListComponent {
  mailString = '';
  constructor(
    public invitationService: InvitationService,
    public dialog: MatDialog,
    private snackBar: SnackbarService
  ) {}

  sendInvitations() {
    console.log(this.mailString.length > 0);

    if (this.mailString.length > 0) {
      this.snackBar.showMessage('Email input is not empty!');
      return;
    }
    console.log(this.invitationService.invitedContacts());
    this.openDialog();
  }

  removeInvitation(contact: any) {
    this.invitationService.removeInvitation(contact);
  }
  clearAllInvitations() {
    this.invitationService.clearAllInvitations();
  }

  inviteByMail() {
    this.invitationService.inviteByMail(this.mailString);
  }

  openDialog(): void {
    const data = this.invitationService.invitedContacts();
    const dialogRef = this.dialog.open(DialogComponent, { data });

    dialogRef.afterClosed().subscribe((result) => {
      this.invitationService.sendInvites();
    });
  }
}
