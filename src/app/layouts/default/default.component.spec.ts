import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefaultComponent } from './default.component';
import { BehaviorSubject } from 'rxjs';
import { DrawerState, TREE_DATA } from 'src/app/layouts/default/models/main';
import { HeaderComponent } from './header/header.component';
import { DrawerComponent } from './drawer/drawer.component';
import { TreeMenuComponent } from './tree-menu/tree-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ModeSwitcherService } from 'src/app/shared/services/mode-switcher.service';

describe('DefaultComponent', () => {
  let component: DefaultComponent;
  let fixture: ComponentFixture<DefaultComponent>;
  let modeSwitcherService: ModeSwitcherService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultComponent],
      imports: [
        MatIconModule,
        HeaderComponent,
        BrowserAnimationsModule,
        DrawerComponent,
        TreeMenuComponent,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([]),
      ],
      providers: [ModeSwitcherService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultComponent);
    component = fixture.componentInstance;
    modeSwitcherService = TestBed.inject(ModeSwitcherService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.drawerState).toEqual({
      left: false,
      right: false,
    } as DrawerState);
    expect(component.treeData).toEqual(TREE_DATA);
    expect(component.leftSidebarSettings).toEqual({
      mode: 'over',
      hasBackdrop: false,
      disableClose: true,
      minWidth: '0px',
      maxWidth: '12em',
      opened: false,
    });
    expect(component.rightSidebarSettings).toEqual({
      mode: 'over',
      hasBackdrop: false,
      disableClose: true,
      minWidth: '0px',
      maxWidth: '15em',
      opened: false,
    });
    expect(component.sidebarToggle$ instanceof BehaviorSubject).toBeTruthy();
    expect(component.state).toBe('default');
    expect(component.user).toEqual({ id: 1, firstName: 'User' });
  });

  it('should call sideBarToggler method and update sidebarToggle$ subject', () => {
    spyOn(component.sidebarToggle$, 'next');
    component.sideBarToggler('left');
    expect(component.sidebarToggle$.next).toHaveBeenCalledWith('left');
  });

  it('should update drawerState', () => {
    const newState = { left: false, right: true } as DrawerState;
    component.updateDrawerState(newState);
    expect(component.drawerState).toEqual(newState);
  });

  it('should toggle theme', () => {
    spyOn(modeSwitcherService, 'toggleTheme');
    component.toggleTheme();
    expect(modeSwitcherService.toggleTheme).toHaveBeenCalled();
  });
});
