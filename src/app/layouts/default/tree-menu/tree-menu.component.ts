import { AfterContentInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

interface TreeNode {
    name: string;
    children?: TreeNode[];
    path?: string;
    icon?: string;
}

@Component({
    selector: 'app-tree-menu',
    standalone: true,
    imports: [
        CommonModule,
        MatTreeModule,
        MatDividerModule,
        MatIconModule,
        MatButtonModule,
        TranslateModule,
        RouterLink,
        RouterLinkActive,
    ],
    templateUrl: './tree-menu.component.html',
    styleUrls: ['./tree-menu.component.scss'],
})
export class TreeMenuComponent implements AfterContentInit {
    @Input() set treeData(value: TreeNode[]) {
        this.dataSource.data = value;
    }
    @Input() set activePath(path: string) {
        this._activePath = path;
    }
    @Input() set drawerStateOpen(state: boolean) {
        this._drawerStateOpen = state;
        if (!state) this.closeAllNodes();
    }

    @Output() menuClick: EventEmitter<TreeNode> = new EventEmitter();
    @Output() expandTree: EventEmitter<any> = new EventEmitter();

    _activePath!: string;
    treeControl = new NestedTreeControl<TreeNode>((node) => node.children);

    expandedNodeID!: number;
    location!: string;
    isRoutingNode = false;
    _drawerStateOpen!: boolean;

    public dataSource = new MatTreeNestedDataSource<TreeNode>();

    hasChild = (_: number, node: TreeNode): boolean => !!node.children && node.children.length > 0;

    constructor(location: Location) {
        this.location = location.path().split('/')[1] || location.path().split('/')[0] || '';
    }

    ngAfterContentInit(): void {
        this.dataSource.data.forEach((el: any) => {
            if (el.children?.length && this.isActiveNodeID(el.children, this.location))
                this.treeControl.expand(el);
        });
    }

    closeAllNodes(): void {
        this.treeControl.collapseAll();
    }

    isActiveNodeID(tree: TreeNode[], path: string): boolean {
        return tree.some((e) => e.path === path);
    }

    setLocationPath(
        node: any,
        event: Event,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _treeControl: NestedTreeControl<TreeNode, TreeNode>,
    ): void {
        if (!this._drawerStateOpen) this.expandTree.emit(node);

        event.stopPropagation();
    }
}
