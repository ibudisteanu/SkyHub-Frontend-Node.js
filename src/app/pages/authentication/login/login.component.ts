import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

//import { RestService } from '../../../services/rest/http/rest.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  //providers: [RestService, AuthService],
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit
{
  private sPassword: string;
  private sEmailUserName: string;

  private sErrorMessage : string;
  private sSuccessfullyMessage : string;

  constructor(
    private userServ: UserService,
    //private restServ: RestService,
    private authServ: AuthService,
    private router: Router
  )
  {
  }

  public ngOnInit() {
    window.dispatchEvent( new Event( 'resize' ) );
  }

  protected loginForm() {

    this.sErrorMessage = ''; this.sSuccessfullyMessage = '';

    this.authServ.loginAsync(this.sEmailUserName, this.sPassword).then((res : any) => {
      if ( String( res.result ) === "true")
        this.loginSuccessfully(res);
      else
        this.loginUnsuccessfully(res);
    });


  }

  private loginFormHTTP() {

    this.authServ.loginHTTP(this.sEmailUserName, this.sPassword).then((res) => {
      if (res) {
        this.loginSuccessfully(res);
      }
      else
        this.loginUnsuccessfully(res);
    });

  }

  protected loginSuccessfully(res){

    this.sErrorMessage = '';
    this.sSuccessfullyMessage = res.message;

    let user1 = new User( {
      avatarUrl: 'public/assets/img/user2-160x160.jpg',
      email: 'weber.antoine.pro@gmail.com',
      firstName: 'WEBER',
      lastName: 'Antoine'
    } );

    user1.connected = true;

    this.userServ.setCurrentUser( user1 );

    this.router.navigate( ['home'] );
  }

  protected loginUnsuccessfully(res){
    this.sErrorMessage = res.message;
    this.sSuccessfullyMessage = '';

    console.log(res);
  }

  private logOut(){
    this.userServ.logout();
  }

  private clearFields(){
    this.sEmailUserName = '';
    this.sPassword = '';
  }

}
