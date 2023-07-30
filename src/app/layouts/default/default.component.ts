import { Component, effect } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DrawerState, SidebarSettings, TREE_DATA } from './models/main';
import { ModeSwitcherService } from 'src/app/shared/services/mode-switcher.service';
import { DataService } from 'src/app/shared/services/data.service';
import { SideBarState } from 'src/app/shared/models/sidebarState.model';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent {
  drawerState: DrawerState = { left: true, right: true };
  treeData = TREE_DATA;
  // mode = 'over';
  leftSidebarSettings: SidebarSettings = {
    mode: 'side',
    hasBackdrop: false,
    disableClose: true,
    minWidth: '2.9em', //'46px'
    maxWidth: '12em',
    opened: false,
  };
  rightSidebarSettings: SidebarSettings = {
    mode: 'over',
    hasBackdrop: false,
    disableClose: true,
    minWidth: '0px',
    maxWidth: '20em',
    opened: false,
  };

  sidebarToggle$: BehaviorSubject<SideBarState> = new BehaviorSubject({
    side: 'left',
    position: null,
  } as SideBarState);

  state = 'default';
  user!: { id: number; firstName: string };
  constructor(
    public modeSwitcherService: ModeSwitcherService,
    public data: DataService
  ) {
    // public userService: UserService, private router: Router
    // this.userService.user$.subscribe((user) => {
    this.user = { id: 1, firstName: 'User' };
    // });
    this.sideBarToggler('left');
    // this.drawerState.right = true;
    effect(() => {
      this.data.invitedContacts().size > 0
        ? this.makeRightVisible(true)
        : this.makeRightVisible(false);
    });
  }

  sideBarToggler(side: string, position: boolean | null = null): void {
    this.sidebarToggle$.next({ side, position });
  }

  makeRightVisible(notEmpty: boolean): void {
    if (notEmpty) {
      this.drawerState.right = true;
      this.sideBarToggler('right', true);
    } else {
      this.drawerState.right = false;
      this.sideBarToggler('right', false);
    }
  }

  updateDrawerState(state: any): void {
    this.drawerState = state;
  }

  activeTabChange(event: any): void {}

  toggleTheme(): void {
    this.modeSwitcherService.toggleTheme();
  }
}
