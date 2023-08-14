import { AddressBookEntry } from './../../../shared/models/addressBookEntry.model';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  Output,
} from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeModule,
} from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';
import { AddressBookService } from 'src/app/shared/services/address-book.service';
import { FullNamePipe } from 'src/app/shared/pipes/name.pipe';

interface ContactNode {
  name: string;
  contacts?: ContactNode[];
  email?: any;
}

interface ContactFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  contact?: any;
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  standalone: true,
  imports: [
    MatTreeModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FullNamePipe,
  ],
})
export class TreeComponent {
  @Input() set data(data: any) {
    this.flattenData(data, null, 0);
    console.log(data);

    this.dataSource.data = data;
    console.log(this.dataSource.data);
  }
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();

  flatData: ContactFlatNode[] = [];
  checklistSelection = new SelectionModel<ContactFlatNode>(true /* multiple */);

  Object = Object;
  treeControl = new FlatTreeControl<ContactFlatNode, ContactFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  private transformer = (node: ContactNode, level: number) => {
    return {
      expandable: !!node.contacts && node.contacts.length > 0,
      name: node.name,
      level: level,
      email: node.email,
    };
  };

  treeFlattener = new MatTreeFlattener<ContactNode, ContactFlatNode>(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.contacts
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    // this.dataSource.data = this.data1;
  }

  hasChild = (_: number, node: ContactFlatNode) => node.expandable;

  /** Whether all the descendants of the node are selected */
  descendantsAllSelected(node: ContactFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every((child) =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  /** Toggle the selection of a node */
  toggleNode(node: ContactFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    this.selected.emit(
      this.getEmailNodesOnly(this.checklistSelection.selected)
    );
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: ContactFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some((child) =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.checklistSelection.isSelected(node);
  }

  flattenData(nodes: ContactNode[], parent: ContactNode | null, level: number) {
    nodes.forEach((node) => {
      const flatNode: ContactFlatNode = {
        expandable: !!node.contacts && node.contacts.length > 0,
        name: node.name,
        level: level,
        contact: node.contacts,
      };
      this.flatData.push(flatNode);

      if (node.contacts) {
        this.flattenData(node.contacts, node, level + 1);
      }
    });
  }

  private getEmailNodesOnly(nodes: any[]) {
    return nodes.filter((node) => node.email);
  }
}
