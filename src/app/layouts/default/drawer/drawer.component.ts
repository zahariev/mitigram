import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { DrawerState, SidebarSettings } from '../models/main';

const INIT_SETTINGS: SidebarSettings = {
    mode: 'side',
    hasBackdrop: true,
    disableClose: false,
    minWidth: '50px',
    maxWidth: '200px',
    opened: false,
};

@Component({
    selector: 'app-drawer',
    standalone: true,
    imports: [CommonModule, MatSidenavModule, MatIconModule, MatButtonModule, MatTreeModule],
    templateUrl: './drawer.component.html',
    styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements OnInit, OnDestroy {
    @Input() position: 'start' | 'end' = 'start';
    @Input() leftSettings: SidebarSettings = INIT_SETTINGS;
    @Input() rightSettings: SidebarSettings = INIT_SETTINGS;
    @Input() toggleSide!: BehaviorSubject<string>;
    @Output() drawerState: EventEmitter<DrawerState> = new EventEmitter<DrawerState>();

    sideBarOpen: DrawerState = {} as DrawerState;

    ngOnInit(): void {
        this.toggleSide
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe((side: string) => this.toggleSideBar(side));

        this.sideBarOpen.left = this.leftSettings.opened || false;
        this.sideBarOpen.right = this.rightSettings.opened || false;
    }

    toggleSideBar(side: string): void {
        const sideKey = side as keyof DrawerState;
        this.sideBarOpen[sideKey] = !this.sideBarOpen[sideKey];
        this.drawerState.emit(this.sideBarOpen);
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 200);
    }

    private componentDestroyed$: Subject<void> = new Subject<void>();
    ngOnDestroy(): void {
        this.componentDestroyed$.next();
    }
}
