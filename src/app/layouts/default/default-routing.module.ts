import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: 'invite',
        pathMatch: 'full',
        loadChildren: () =>
          import('../../modules/invite/invite.module').then(
            (mod) => mod.InviteModule
          ),
      },

      { path: '', redirectTo: 'invite', pathMatch: 'full' },

      { path: '**', redirectTo: 'invite', pathMatch: 'full' },
    ],
  },

  { path: '404', redirectTo: 'notfound', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefaultRoutingModule {}
