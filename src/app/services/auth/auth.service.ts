/*
    TUTORIAL BASED on http://tphangout.com/angular-2-authentication/
 */

import { Injectable } from '@angular/core';
import {RestService} from '../rest/http/rest.service';
import {SocketIoService} from '../rest/socket/socketio.service';
import {CookiesService} from "./cookies/cookies.service";
import {UserService} from "../user.service";
import { User } from './../../models/user';

@Injectable()
export class AuthService {


    constructor(
        private restService : RestService,
        private socketService : SocketIoService,
        private userService: UserService,
        private cookiesService : CookiesService
    ) {
        this.loadCookieUser();

    }

    public loadCookieUser ( ){
        var token = this.cookiesService.getTokenCookie();
        if (token !== ""){
            this.loginTokenAsync(token);
        }
    }

    public loginAsync(sEmailUserName, sPassword)
    {
        this.logout();

        return new Promise( (resolve)=> {

            //Using Promise
            this.socketService.sendRequestGetDataPromise("auth/login",{emailUsername:sEmailUserName, password:sPassword}).then( (resData : any) => {

                console.log('Answer from Server Auth Login');
                console.log(resData);

                if(resData.result == "true") {

                    let userLogged = new User( resData.user);
                    this.userService.setAuthenticatedUser( userLogged );

                    this.cookiesService.setCookie('token', resData.token, 365*5, '/');
                    console.log('setting cookie'+resData.token);
                }

                resolve(resData);

            });

        });

    }

    public loginTokenAsync(token){
        return new Promise( (resolve)=> {
            //Using Promise
            this.socketService.sendRequestGetDataPromise("auth/login-token",{token:token}).then( (resData : any) => {

                console.log('Answer from Login Token Async');
                console.log(resData);

                if(resData.result == "true") {

                    let userLogged = new User( resData.user);
                    this.userService.setAuthenticatedUser( userLogged );
                }

                resolve(resData);

            });
        });
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

                    let userLogged = new User( resData.user);
                    this.userService.setAuthenticatedUser( userLogged );

                    this.cookiesService.setCookie('token', resData.token, 365*5, '/');
                    console.log('setting cookie'+resData.token);
                }

                resolve(resData);
            }).catch (function (e)
            {
                console.log("Error loggin in");
                console.log(e);
            });

        });


    }

    public logout(){
        this.userService.logout();
    }

    public getLoggedInStatus(){
        return this.userService.bLoggedIn;
    }
}