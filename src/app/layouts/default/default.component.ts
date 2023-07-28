import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DrawerState, SidebarSettings, TREE_DATA } from './models/main';
import { ModeSwitcherService } from 'src/app/shared/services/mode-switcher.service';

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
    mode: 'over',
    hasBackdrop: false,
    disableClose: true,
    minWidth: '0px', //'2.8em','46px'
    maxWidth: '12em',
    opened: false,
  };
  rightSidebarSettings: SidebarSettings = {
    mode: 'over',
    hasBackdrop: false,
    disableClose: true,
    minWidth: '0px',
    maxWidth: '15em',
    opened: false,
  };

  sidebarToggle$: BehaviorSubject<string> = new BehaviorSubject('left');

  state = 'default';
  user!: { id: number; firstName: string };
  constructor(public modeSwitcherService: ModeSwitcherService) {
    // public userService: UserService, private router: Router
    // this.userService.user$.subscribe((user) => {
    this.user = { id: 1, firstName: 'User' };
    // });
    this.sideBarToggler('left');
  }

  sideBarToggler(side: string): void {
    this.sidebarToggle$.next(side);
  }

  updateDrawerState(state: any): void {
    this.drawerState = state;
  }

  activeTabChange(event: any): void {
    console.log(event);
  }

  toggleTheme(): void {
    this.modeSwitcherService.toggleTheme();
  }
}
