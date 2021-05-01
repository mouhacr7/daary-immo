import { AgDashboardPageModule } from './ag-dashboard.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgDashboardPage } from './ag-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: AgDashboardPage,
    // children: [
    //   {
    //     path: 'app-flow',
    //     loadChildren: () => import('../../../pages/app-flow/app-flow.module').then(m => m.AppFlowPageModule)
    //   },
    //   {
    //     path: 'search-property',
    //     loadChildren: () => import('../../../pages/search-property/search-property.module').then(m => m.SearchPropertyPageModule)
    //   },
    //   {
    //     path: 'favorites',
    //     loadChildren: () => import('../../../pages/favorites/favorites.module').then( m => m.FavoritesPageModule)
    //   },
    //   {
    //     path: 'ag-dashboard',
    //     loadChildren: () => import('../ag-dashboard/ag-dashboard.module').then(m => m.AgDashboardPageModule)
    //   },
    //   {
    //     path: 'infos',
    //     loadChildren: () => import('../../../pages/infos/infos.module').then( m => m.InfosPageModule)
    //   },
    //   {
    //     path: '',
    //     redirectTo: '/ag-dashboard',
    //     pathMatch: 'full'
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgDashboardPageRoutingModule {}
