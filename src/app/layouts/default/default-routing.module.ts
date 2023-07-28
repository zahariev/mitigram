import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default.component';
import { DialPadComponent } from '@app/modules/pos/components/dialpad/dialpad.component';

const routes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            {
                path: 'pos',
                pathMatch: 'full',
                loadChildren: () =>
                    import('../../modules/pos/pos.module').then((mod) => mod.PosModule),
            },
            {
                path: 'system',
                pathMatch: 'full',
                component: DialPadComponent,
            },
            { path: '', redirectTo: 'pos', pathMatch: 'full' },

            { path: '**', redirectTo: 'pos', pathMatch: 'full' },
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

