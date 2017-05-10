import { Component, OnInit,  OnDestroy   } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';
import { ScriptsService } from '../../../../services/scripts/scripts.service';

import { AuthService } from '../../../../services/auth/auth.service';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html'
})
export class RegisterFormComponent implements OnInit {

    private sUserName : string;
    private sPassword: string;
    private sEmail: string;
    private sRetypePassword : string;
    private sFirstName : string;
    private sLastName : string;
    private sCountry : string;
    private sCity : string;

    private errorFirstNameMessage : string;
    private errorLastNameMessage : string;

    public OnRegisterSuccessfully = null;
    public OnRegisterUnsuccessfully = null;

    constructor(
        private userServ: UserService,
        //private restServ: RestService,
        private authServ: AuthService,
        private scriptsServ: ScriptsService,
        private router: Router,
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

        let userRegistered = new User( res.user );
        this.userServ.setAuthenticatedUser( userRegistered );

        if (this.OnRegisterUnsuccessfully != null)
            this.OnRegisterUnsuccessfully(res);
        else
            this.router.navigate( ['/home'] );

    }

    protected registrationUnsuccessfully(res){

        this.errorFirstNameMessage = res.errors.firstName;
        this.errorLastNameMessage = res.errors.lastName;
        this.errorLastNameMessage = res.errors.lastName;

        if (this.OnRegisterUnsuccessfully != null)
            this.OnRegisterUnsuccessfully(res);

    }

}
