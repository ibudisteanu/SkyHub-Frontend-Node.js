import { Component, OnInit,  OnDestroy , NgModule, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentFactory  } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';

//import { RestService } from '../../../../services/rest/http/rest.service';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
    //providers: [RestService, AuthService],
    selector: 'app-login-form',
    templateUrl: './login-form.component.html'
})

export class LoginFormComponent  implements OnInit
{
    private sPassword: string;
    private sEmailUserName: string;

    private sErrorMessage : string;
    private sSuccessfullyMessage : string;

    public OnLoginSuccessfully : any = null;
    public OnLoginUnsuccessfully : any = null;

    constructor(
        private userServ: UserService,
        //private restServ: RestService,
        private authServ: AuthService,
        private router: Router,
    )
    {
    }

    public ngOnInit() {
        window.dispatchEvent( new Event( 'resize' ) );
    }

    protected loginForm() {

        this.sErrorMessage = ''; this.sSuccessfullyMessage = '';

        this.router.navigate( ['/home'] );

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

        console.log(res.user);

        if (this.OnLoginSuccessfully== null){

            this.router.navigate( ['/home'] );

        } else {
            this.OnLoginSuccessfully (true);
        }

    }

    protected loginUnsuccessfully(res){
        this.sErrorMessage = res.message;
        this.sSuccessfullyMessage = '';

        console.log(res);

        if (this.OnLoginUnsuccessfully == null){


        } else  {
            this.OnLoginUnsuccessfully(true);
        }

    }

    private logOut(){
        this.userServ.logout();
    }

    private clearFields(){
        this.sEmailUserName = '';
        this.sPassword = '';
    }

}
