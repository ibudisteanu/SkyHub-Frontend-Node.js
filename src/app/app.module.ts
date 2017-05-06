// external module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AlertModule, DatepickerModule } from 'ng2-bootstrap';
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';
import { environment } from '../environments/environment';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';


export function createTranslateLoader( http: Http ) {
    return new TranslateStaticLoader( http, '../public/assets/i18n', '.json' );
}

let modules = [
    AlertModule.forRoot(),
    DatepickerModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AngularFireModule.initializeApp( environment.firebase ),
    TranslateModule.forRoot({
        deps: [Http],
        provide: TranslateLoader,
        useFactory: (createTranslateLoader)
    }),
    ToasterModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
];

import { AppComponent } from './app.component';

import { AppHeaderComponent } from './widgets/app-header';
import { AppFooterComponent } from './widgets/app-footer';
import { MenuAsideComponent } from './widgets/menu-aside';
import { ControlSidebarComponent } from './widgets/control-sidebar';
import { MessagesBoxComponent } from './widgets/messages-box';
import { NotificationBoxComponent } from './widgets/notification-box';
import { TasksBoxComponent } from './widgets/tasks-box';
import { UserBoxComponent } from './widgets/user-box';
import { BreadcrumbComponent } from './widgets/breadcrumb';
import { SocketConnectionStatusBarComponent } from './widgets/socket-connection-status-bar';
import { AuthenticationModalWidgetComponent } from './widgets/authentication-modal';

let widgets = [
    AppComponent,
    BreadcrumbComponent,
    AppHeaderComponent,
    AppFooterComponent,
    MenuAsideComponent,
    ControlSidebarComponent,
    MessagesBoxComponent,
    NotificationBoxComponent,
    TasksBoxComponent,
    UserBoxComponent,
    SocketConnectionStatusBarComponent,

    AuthenticationModalWidgetComponent
];

import { MessagesService } from './services/messages.service';
import { CanActivateAuthGuard } from './services/auth/auth-guard.service';
import { NotificationService } from './services/notification.service';
import { BreadcrumbService } from './services/breadcrumb.service';
import { AdminLTETranslateService } from './services/translate.service';
import { LoggerService } from './services/logger.service';
import { SocketIoService } from "./services/rest/socket/socketio.service";
import { RestService } from "./services/rest/http/rest.service";
import { CookiesService } from "./services/auth/cookies/cookies.service";
import { AuthService } from "./services/auth/auth.service";
import { ScriptsService } from "./services/scripts/scripts.service";
import { UserService } from './services/user.service';

let services = [
    BreadcrumbService,
    MessagesService,
    CanActivateAuthGuard,
    NotificationService,
    AdminLTETranslateService,
    LoggerService,
    SocketIoService,
    RestService,
    AuthService,
    CookiesService,
    ScriptsService,
    UserService,
];

// les pages
import { HomeComponent } from './pages/home/home.component';
import { PageNumComponent } from './pages/page-num/page-num.component';
import { ClientComponent } from './pages/client/client.component';

import { LoginFormComponent } from './pages/authentication/login/login-form/login-form.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { RegisterComponent } from './pages/authentication/register/register.component';

import { LayoutWebsiteComponent } from './pages/layouts/website/layout-website.component';

import { LayoutAuthenticatedComponent } from './pages/layouts/website/authenticated/layout-authenticated.component';
import { LayoutNotAuthenticatedComponent } from './pages/layouts/website/not-authenticated/layout-not-authenticated.component';

import { AuthenticationModelWindow } from './widgets/authentication-modal/authentication-modal-window/authentication-modal-window.component';

let pages = [
    HomeComponent,
    PageNumComponent,
    ClientComponent,

    LayoutWebsiteComponent,
    LayoutAuthenticatedComponent,
    LayoutNotAuthenticatedComponent,

    LoginFormComponent,
    LoginComponent,
    RegisterComponent,

    AuthenticationModelWindow,

];

// main bootstrap
import { routing } from './app.routes';

// IMPORTANT:
// Since 'AdditionCalculateWindow' is never explicitly used (in a template)
// we must tell angular about it.
let entryComp = [
    AuthenticationModelWindow,
];


@NgModule( {
    bootstrap: [AppComponent ],
    declarations: [
        ...widgets,
        ...pages
    ],
    imports: [
        ...modules,
        routing
    ],
    providers: [
        ...services
    ],


    entryComponents: entryComp,

})
export class AppModule { }