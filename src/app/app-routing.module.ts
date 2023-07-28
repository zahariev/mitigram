import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //     path: 'login',
  //     loadComponent: () => import('./auth/login.module').then((m) => m.LoginModule),
  // },
  {
    path: '',
    loadChildren: () =>
      import('./layouts/default/default.module').then(
        (mod) => mod.DefaultModule
      ),
  },
  { path: '404', redirectTo: 'notfound', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
