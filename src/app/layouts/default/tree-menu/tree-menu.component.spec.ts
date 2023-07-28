/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule, Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';
import { MatTreeModule } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { TreeMenuComponent } from './tree-menu.component';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

interface TreeNode {
    name: string;
    children?: TreeNode[];
    path?: string;
    icon?: string;
}

describe('TreeComponent', () => {
    let component: TreeMenuComponent;
    let fixture: ComponentFixture<TreeMenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [],
            imports: [
                CommonModule,
                MatTreeModule,
                MatDividerModule,
                MatIconModule,
                TreeMenuComponent,
                TranslateModule.forRoot(),
                RouterTestingModule.withRoutes([]),
            ],
            providers: [
                Location,
                RouterLink,
                RouterLinkActive,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({ id: 123 }),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TreeMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        const treeData: TreeNode[] = [
            {
                name: 'Node 1',
                children: [
                    {
                        name: 'Child Node 1',
                        path: '/child-node-1',
                    },
                ],
            },
        ];
        component.treeData = treeData;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set tree data', () => {
        const treeData: TreeNode[] = [
            {
                name: 'Node 1',
                children: [
                    {
                        name: 'Child Node 1',
                        path: '/child-node-1',
                    },
                ],
            },
        ];
        // component.treeData = treeData;
        expect(component.dataSource.data).toEqual(treeData);
    });

    it('should return true if a node with the given path does exist', () => {
        const tree: TreeNode[] = [
            {
                name: 'Node 1',
                path: 'node1',
            },
            {
                name: 'Node 2',
                path: 'node2',
                children: [
                    {
                        name: 'Node 3',
                        path: 'node3',
                    },
                ],
            },
        ];
        const path = 'node2';
        const result = component.isActiveNodeID(tree, path);
        expect(result).toBeTrue();
    });

    it('should set active path', () => {
        const activePath = '/child-node-1';
        component.activePath = activePath;
        expect(component._activePath).toEqual(activePath);
    });

    it('should set drawer state open', () => {
        const state = true;
        component.drawerStateOpen = state;
        expect(component._drawerStateOpen).toEqual(state);
    });

    it('should emit expandTree when setLocationPath is called', () => {
        spyOn(component.expandTree, 'emit');
        const node: TreeNode = { name: 'Node 1' };
        component.setLocationPath(
            node,
            new Event('click'),
            new NestedTreeControl((n) => n.children),
        );
        expect(component.expandTree.emit).toHaveBeenCalledWith(node);
    });

    it('should emit expand tree', () => {
        spyOn(component.expandTree, 'emit');
        const node: TreeNode = { name: 'Node 1' };
        component.expandTree.emit(node);
        expect(component.expandTree.emit).toHaveBeenCalledWith(node);
    });

    it('should expand tree', () => {
        component._drawerStateOpen = true;
        const nodes = [{ name: 'Node 1' }, { name: 'Node 2' }];
        const treeControl = new NestedTreeControl<any>((node) => node.children);
        treeControl.dataNodes = nodes;
        component.treeControl = treeControl;

        component.treeControl.expandAll();
        fixture.detectChanges();
        expect(
            component.treeControl.dataNodes.every((n: any) => component.treeControl.isExpanded(n)),
        ).toBe(true);
    });

    it('should collapse all nodes', () => {
        // Create a mock tree control with two expanded nodes
        const nodes = [{ name: 'Node 1' }, { name: 'Node 2' }];
        const treeControl = new NestedTreeControl<any>((node) => node.children);
        treeControl.dataNodes = nodes;
        treeControl.expandAll();

        // Set the tree control in the component
        component.treeControl = treeControl;

        // Call the closeAllNodes method
        component.closeAllNodes();

        // Expect all nodes to be collapsed
        expect(treeControl.expansionModel.selected.length).toBe(0);
    });
});
