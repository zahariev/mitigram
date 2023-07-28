import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerComponent } from './drawer.component';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { DrawerState } from '../models/main';

describe('DrawerComponent', () => {
    let component: DrawerComponent;
    let fixture: ComponentFixture<DrawerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                CommonModule,
                MatSidenavModule,
                MatIconModule,
                MatButtonModule,
                MatTreeModule,
                BrowserAnimationsModule,
                DrawerComponent,
            ],
        }).compileComponents();
    });
    beforeEach(async () => {
        fixture = TestBed.createComponent(DrawerComponent);
        component = fixture.componentInstance;
        component.toggleSide = new BehaviorSubject('left');

        component.drawerState = new EventEmitter();
        fixture.detectChanges();
    });
    afterEach(() => {
        fixture.destroy();
        component.ngOnDestroy();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should emit correct state when toggleSideBar is called', () => {
        spyOn(component.drawerState, 'emit');
        component.toggleSideBar('left');
        expect(component.drawerState.emit).toHaveBeenCalledWith({
            left: true,
            right: false,
        } as DrawerState);
        component.toggleSideBar('right');
        expect(component.drawerState.emit).toHaveBeenCalledWith({
            left: true,
            right: true,
        } as DrawerState);
        component.toggleSideBar('left');
        expect(component.drawerState.emit).toHaveBeenCalledWith({
            left: false,
            right: true,
        } as DrawerState);
    });
    it('should toggle side bar when toggleSide Observable emits', () => {
        fixture.detectChanges();
        component.toggleSideBar('left');
        expect(component.sideBarOpen.left).toBe(true); // initial state is false, should toggle to true
        expect(component.sideBarOpen.right).toBe(false);
        component.toggleSideBar('right');
        expect(component.sideBarOpen.left).toBe(true);
        expect(component.sideBarOpen.right).toBe(true);
    });
    it('should toggle left sidebar state and emit drawerState event', () => {
        const side = 'left';
        spyOn(component.drawerState, 'emit');
        component.toggleSideBar(side);
        expect(component.sideBarOpen[side]).toBe(true); // initial state is false, should toggle to true
        expect(component.drawerState.emit).toHaveBeenCalled(); // should emit drawerState event
    });
    it('should toggle right sidebar state and emit drawerState event', () => {
        const side = 'right';
        spyOn(component.drawerState, 'emit');
        component.toggleSideBar(side);
        expect(component.sideBarOpen[side]).toBeTrue(); // initial state is false, should toggle to true
        expect(component.drawerState.emit).toHaveBeenCalled(); // should emit drawerState event
    });
    it('should trigger the resize event after a delay of 200ms when the toggleSideBar function is called', (done) => {
        spyOn(window, 'dispatchEvent');
        component.toggleSideBar('left');
        setTimeout(() => {
            expect(window.dispatchEvent).toHaveBeenCalledWith(new Event('resize'));
            done();
        }, 210);
    });
});
