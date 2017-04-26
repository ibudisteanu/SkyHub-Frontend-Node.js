/*
    TUTORIAL BASED on http://tphangout.com/angular-2-authentication/
 */

import { Injectable } from '@angular/core';
import {RestService} from '../rest/http/rest.service';
import {SocketIoService} from '../rest/socket/socketio.service';

@Injectable()
export class AuthService {
    isLoggedin: boolean;

    constructor(
        private restService : RestService,
        private socketService : SocketIoService
    ) {

    }

    public loginHTTP(sEmailUserName, sUserPassword) {
        this.isLoggedin = false;

/*        this.restService.postAsync(sEmailUserName+"/"+sUserPassword).then((resData) =>{
             if(resData.json().success) {
                 window.localStorage.setItem('auth_key', resData.json().token);
                 this.isLoggedin = true;
             }
         });*/

        return new Promise( (resolve)=>{

            this.restService.postAsync("auth", {emailUserName:sEmailUserName,userPassword:sUserPassword} ).then((resData : any) =>{

                if(resData.success) {
                    window.localStorage.setItem('auth_key', resData.token);
                    this.isLoggedin = true;
                }

                resolve(this.isLoggedin);
            }).catch (function (e)
            {
                console.log("Error loggin in");
                console.log(e);
            });

        });


    }

    public logout(){
        window.localStorage.removeItem('auth_key');
    }
}