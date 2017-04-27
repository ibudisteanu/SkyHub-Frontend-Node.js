import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  private sUserName : string;
  private sPassword: string;
  private sEmail: string;
  private sRetypePassword : string;
  private sFirstName : string;
  private sLastName : string;
  private sCountry : string;


  constructor(
      private userServ: UserService,
      //private restServ: RestService,
      private authServ: AuthService,
      private router: Router
  ) {
    // TODO
  }

  public ngOnInit() {
    // TODO
  }

  protected registerForm(){
    this.authServ.loginAsync(this.sEmail, this.sPassword).then((res) => {
      if (res)
        this.loginSuccessfully(res);
      else
        this.loginUnsuccessfully(res);
    });
  }

  protected loginSuccessfully(res){
    let user1 = new User( {
      avatarUrl: 'public/assets/img/user2-160x160.jpg',
      email: 'weber.antoine.pro@gmail.com',
      firstname: 'WEBER',
      lastname: 'Antoine'
    } );

    user1.connected = true;

    this.userServ.setCurrentUser( user1 );

    this.router.navigate( ['home'] );
  }

  protected loginUnsuccessfully(res){
    console.log("ERROR LOGIN");
    console.log("DID U FORGOT YOUR PASSWORD?");
    console.log(res);
  }

}
