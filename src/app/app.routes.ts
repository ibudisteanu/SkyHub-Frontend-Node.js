import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateAuthGuard } from './services/auth/auth-guard.service';

// Components
import { HomeComponent } from './pages/home/home.component';
import { PageNumComponent } from './pages/page-num/page-num.component';
import { ClientComponent } from './pages/client/client.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { RegisterComponent } from './pages/authentication/register/register.component';

import { LayoutWebsiteComponent } from './pages/layouts/website/layout-website.component';


const routes: Routes = [
  // logged routes
  {
    canActivate: [CanActivateAuthGuard],
    children: [
      { //  root page
        canActivate: [CanActivateAuthGuard],
        component: HomeComponent,
        path: ''
      },
      { //  root page
        canActivate: [CanActivateAuthGuard],
        component: HomeComponent,
        path: 'home'
      },
      {
        canActivate: [CanActivateAuthGuard],
        component: PageNumComponent,
        path: 'page/:id'
      },
      {
        canActivate: [CanActivateAuthGuard],
        component: ClientComponent,
        path: 'client'
      }
    ],
    component: LayoutWebsiteComponent,
    path: '',
  },
  // not logged routes
  {
    component: LoginComponent,
    path: 'login'
  },
  {
    component: RegisterComponent,
    path: 'register'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
