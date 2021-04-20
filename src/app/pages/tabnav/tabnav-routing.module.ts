import { NgModule } from '@angular/core';
import { TabnavPage } from './tabnav.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: '',
    component: TabnavPage,
    children: [
      {
        path: 'app-flow',
        loadChildren: () => import('../../pages/app-flow/app-flow.module').then(m => m.AppFlowPageModule)
      },
      {
        path: 'search-property',
        loadChildren: () => import('../../pages/search-property/search-property.module').then(m => m.SearchPropertyPageModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import('../../pages/favorites/favorites.module').then( m => m.FavoritesPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../../auth/login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'infos',
        loadChildren: () => import('../../pages/infos/infos.module').then( m => m.InfosPageModule)
      },
      {
        path: '',
        redirectTo: '/app-flow',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/app-flow',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabnavPageRoutingModule {}
