import { Component, OnInit, OnDestroy , ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentFactory } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

//import { RestService } from '../../../services/rest/http/rest.service';
import { AuthService } from '../../../services/auth/auth.service';
import { LoginFormComponent } from './login-form/login-form.component';

@Component({
  //providers: [RestService, AuthService],
  selector: 'app-login',
  templateUrl: './login.component.html',
  entryComponents: [ LoginFormComponent ]
})
export class LoginComponent implements OnInit
{
  private sPassword: string;
  private sEmailUserName: string;

  private sErrorMessage : string;
  private sSuccessfullyMessage : string;

  @ViewChild('LoginFormComponentView', {read: ViewContainerRef}) LoginFormComponentView: ViewContainerRef;

  constructor(
    private userServ: UserService,
    //private restServ: RestService,
    private authServ: AuthService,
    private router: Router,

    private compFactoryResolver: ComponentFactoryResolver,
  )
  {
  }

  public initializeLoginTemplate(){
    let compFactory: ComponentFactory <any>;

    // compFactory = this.compFactoryResolver.resolveComponentFactory(LoginFormComponent);
    // this.LoginFormComponentView.createComponent(compFactory);

    compFactory = this.compFactoryResolver.resolveComponentFactory(LoginFormComponent);
    this.LoginFormComponentView.createComponent(compFactory);

  }


  public ngOnInit() {
    window.dispatchEvent( new Event( 'resize' ) );

    this.initializeLoginTemplate();
  }

  // protected loginForm() {
  //
  //   this.sErrorMessage = ''; this.sSuccessfullyMessage = '';
  //
  //   this.router.navigate( ['/home'] );
  //
  //   this.authServ.loginAsync(this.sEmailUserName, this.sPassword).then((res : any) => {
  //     if ( String( res.result ) === "true")
  //       this.loginSuccessfully(res);
  //     else
  //       this.loginUnsuccessfully(res);
  //   });
  //
  //
  // }
  //
  // private loginFormHTTP() {
  //
  //   this.authServ.loginHTTP(this.sEmailUserName, this.sPassword).then((res) => {
  //     if (res) {
  //       this.loginSuccessfully(res);
  //     }
  //     else
  //       this.loginUnsuccessfully(res);
  //   });
  //
  // }
  //
  // protected loginSuccessfully(res){
  //
  //
  //   this.sErrorMessage = '';
  //   this.sSuccessfullyMessage = res.message;
  //
  //   console.log(res.user);
  //
  //   console.log('going to home');
  //
  //   this.router.navigate( ['/home'] );
  // }
  //
  // protected loginUnsuccessfully(res){
  //   this.sErrorMessage = res.message;
  //   this.sSuccessfullyMessage = '';
  //
  //   console.log(res);
  // }
  //
  // private logOut(){
  //   this.userServ.logout();
  // }
  //
  // private clearFields(){
  //   this.sEmailUserName = '';
  //   this.sPassword = '';
  // }

}
