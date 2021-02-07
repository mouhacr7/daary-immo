import { AgUpdatePropertyComponent } from './components/ag-update-property/ag-update-property.component';
import { PropertyResolverService } from './services/property-resolver.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { AgentResolverService } from './services/agent-resolver.service';
import { MessageResolverService } from './services/message-resolver.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'app-flow',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    loadChildren: () => import('./auth/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'app-flow',
    loadChildren: () => import('./pages/app-flow/app-flow.module').then( m => m.AppFlowPageModule)
  },
  {
    path: 'search-property',
    loadChildren: () => import('./pages/search-property/search-property.module').then( m => m.SearchPropertyPageModule)
  },
  {
    path: 'search-result',
    loadChildren: () => import('./pages/search-result/search-result.module').then( m => m.SearchResultPageModule)
  },
  {
    path: 'property-details/:id',
    loadChildren: () => import('./pages/property-details/property-details.module').then( m => m.PropertyDetailsPageModule),
    resolve: {property: PropertyResolverService}
  },
  {
    path: 'contact-agent/:id',
    loadChildren: () => import('./pages/contact-agent/contact-agent.module').then(m => m.ContactAgentPageModule),
    resolve: {agent: AgentResolverService}
  },
  {
    path: 'upload-property',
    loadChildren: () => import('./pages/upload-property/upload-property.module').then( m => m.UploadPropertyPageModule)
  },
  {
    path: 'buyer-profile',
    loadChildren: () => import('./pages/buyer-profile/buyer-profile.module').then( m => m.BuyerProfilePageModule)
  },
  {
    path: 'infos',
    loadChildren: () => import('./pages/infos/infos.module').then( m => m.InfosPageModule)
  },
  {
    path: 'properties',
    loadChildren: () => import('./pages/properties/properties.module').then( m => m.PropertiesPageModule)
  },
  {
    path: 'property-location',
    loadChildren: () => import('./pages/property-location/property-location.module').then( m => m.PropertyLocationPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./pages/favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
  {
    path: 'find-agents',
    loadChildren: () => import('./pages/find-agents/find-agents.module').then( m => m.FindAgentsPageModule)
  },
  {
    path: 'ag-dashboard',
    loadChildren: () => import('./pages/Agent/ag-dashboard/ag-dashboard.module').then( m => m.AgDashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'usr-dashboard',
    loadChildren: () => import('./pages/User/usr-dashboard/usr-dashboard.module').then( m => m.UsrDashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'message-details/:id',
    loadChildren: () => import('./pages/message-details/message-details.module').then(m => m.MessageDetailsPageModule),
    resolve: {message: MessageResolverService}
  },

  {
    path: 'update-property/:id',
    loadChildren: () => import('./pages/update-property/update-property.module').then( m => m.UpdatePropertyPageModule),
    resolve: {property: PropertyResolverService}
  },
  {
    path: 'replay-message/:id',
    loadChildren: () => import('./pages/replay-message/replay-message.module').then( m => m.ReplayMessagePageModule),
    resolve: {message: MessageResolverService}
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./auth/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'verification-code',
    loadChildren: () => import('./auth/verification-code/verification-code.module').then( m => m.VerificationCodePageModule)
  },  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,  {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
