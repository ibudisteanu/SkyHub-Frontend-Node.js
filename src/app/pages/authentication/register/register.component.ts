import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { ScriptsService } from '../../../services/scripts/scripts.service';

import { AuthService } from '../../../services/auth/auth.service';
import $ from 'jquery';

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
  private sCity : string;


  constructor(
      private userServ: UserService,
      //private restServ: RestService,
      private authServ: AuthService,
      private scriptsServ: ScriptsService,
      private router: Router
  ) {
    // TODO
  }

  public ngOnInit() {
    // TODO


    this.scriptsServ.load('countrySelect', 'countrySelectCSS', 'countrySelectPersonalCSS', 'countrySelectRegistrationInitialization').then(data => {
      console.log('script loaded ', data);

    }).catch(error => console.log(error));


    //$('#demo').flagStrap();
  }

  protected registerForm(){
    this.authServ.registerAsync(this.sUserName, this.sEmail, this.sPassword, this.sFirstName, this.sLastName, this.sCountry, this.sCity).then((res) => {
      if (res)
        this.registrationSuccessfully(res);
      else
        this.registrationUnsuccessfully(res);
    });
  }

  protected registrationSuccessfully(res){
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

  protected registrationUnsuccessfully(res){
    console.log("ERROR LOGIN");
    console.log("DID U FORGOT YOUR PASSWORD?");
    console.log(res);
  }

}
