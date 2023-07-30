export interface SidebarSettings {
  mode: 'over' | 'push' | 'side';
  hasBackdrop: boolean;
  disableClose: boolean;
  minWidth: string;
  maxWidth: string;
  opened: boolean;
}

export interface TreeNode {
  name: string;
  children?: TreeNode[];
  path?: string;
  icon?: string;
}

export type DrawerState = {
  left: boolean;
  right: boolean;
};

export const TREE_DATA: TreeNode[] = [
  { name: 'Invite', icon: 'checklist', path: 'invite' },
  // { name: 'UI', icon: 'list_alt', path: 'elements' },
  // { name: 'Logins', icon: 'login', path: 'system' },
  { name: 'Dashboard', icon: 'dashboard', path: 'dashboard' },

  {
    name: 'Other',
    icon: 'dynamic_feed',
    children: [
      { name: 'Broccoli', icon: 'home', path: 'green' },
      { name: 'Brussels sprouts' },
    ],
  },
];
