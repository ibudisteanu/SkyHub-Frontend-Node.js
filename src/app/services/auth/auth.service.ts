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

    public loginAsync(sEmailUserName, sPassword)
    {
        this.logout();

        return new Promise( (resolve)=> {

            //Using Promise
            this.socketService.sendRequestGetDataPromise("auth/login",{emailUsername:sEmailUserName, password:sPassword}).then( (resData : any) => {

                console.log('Answer from Server Auth Login');
                console.log(resData);

                if(resData.success) {
                    window.localStorage.setItem('auth_key', resData.token);
                    this.isLoggedin = true;
                }

                resolve(resData);

            });

        });

        /*
         //Sending with Observable
         this.socketService.sendRequestObservable("auth/login",{emailUserName:sEmailUserName,userPassword:sUserPassword}).subscribe( resData =>{

         console.log('Answer from Server Auth Login');
         console.log(resData);
         console.log(this);

         if(resData.success) {
         window.localStorage.setItem('auth_key', resData.token);
         this.isLoggedin = true;
         }

         resolve(resData);
         });
        */
    }

    public registerAsync(sUsername, sEmailAddress, sPassword, sFirstName, sLastName, sCountry, sCity){

        return new Promise( (resolve)=> {

            //Using Promise
            this.socketService.sendRequestGetDataPromise("auth/register",{email:sEmailAddress, username: sUsername, password: sPassword,
                                                                          firstName: sFirstName, lastName: sLastName, country: sCountry, city : sCity }).then( (resData : any) => {

                console.log('Answer from Server Auth Login');
                console.log(resData);

                if(resData.success) {
                    this.loginAsync(sEmailAddress, sPassword);
                }

                resolve(resData);

            });

        });

    }

    public loginHTTP(sEmailUserName, sUserPassword) {
        this.logout();

        return new Promise( (resolve)=>{

            this.restService.postAsync("auth/login", {emailUsername:sEmailUserName,password:sUserPassword} ).then((resData : any) =>{

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
        this.isLoggedin = false;
        window.localStorage.removeItem('auth_key');
    }
}