import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { ReplaySubject } from 'rxjs';
import {CookiesService} from "../../auth/cookies/cookies.service";

//import { Configuration } from '../../app.constants';


@Injectable()
export class SocketIoService{

    public socket = null;
    protected sServerSocketAddress = "myskyhub.ddns.net:3000";
    protected sServerSocketApi = "api/";

    public sServerSocketVersion = "";

    public currentSocketServiceStatusObservable: ReplaySubject<any>;

    constructor(
        //private config: Configuration
        private cookiesServ : CookiesService,
    )
    {
        this.currentSocketServiceStatusObservable = new ReplaySubject(1);
        console.log('Client Socket Constructor');
        //this.sServerSocketAddress = this.config.Socket_Server
        //this.sServerSocketApi = this.config.Socket_Server_API

        this.createClientSocket();
    }

    private createClientSocket()
    {
        this.socket = io.connect(this.sServerSocketAddress,{
            query : "token=" + this.cookiesServ.getTokenCookie() //JWT Token
            //query: "connect.sid=" + "connect.sid"
            //query: 'session_id=' + this.readCookie2('connect.sid')
        });

        this.setSocketReadObservable("connect").subscribe( response =>{

            console.log('Client has connected to the server!');

            this.changeSocketStatus({
                display: false,
                description: "The connection is established"
            });

        });




        this.socket.on('api/news', function(res){
            console.log('news');
            console.log(res);
        });

        // THE SAME CODE written but using OBSERVABLE
        this.setSocketReadObservable("connectionReady").subscribe( response =>{

                console.log("Connection Ready: "+response);

                this.sendRequestObservable("version",'').subscribe (response => {

                    this.sServerSocketVersion = response.version;

                    console.log("API VERSION: "+response.version);
                });
            }
        );


        // Add a connect listener
        this.socket.on('api/message',function(data) {
            console.log('Received a message from the server!',data);
        });

        // Add a disconnect listener
        this.setSocketReadObservable("disconnect").subscribe( response =>{
            console.log('The client has disconnected!');

            this.changeSocketStatus({
                display: true,
                type: "warning",
                description: "Problem connecting to the web server"
            });
        });

    }

    /*
           FUNCTIONS
     */

    public sendRequest(sRequestName, sRequestData){

        //console.log('sending'+sRequestName); console.log(sRequestData);

        if ((sRequestName !== '') || (sRequestData !== ''))
            return this.socket.emit(this.sServerSocketApi+sRequestName, sRequestData);
    }

    /*
        Sending the Request and Obtain the Promise to Wait Async
     */
    public sendRequestGetDataPromise(sRequestName, sRequestData){
        return new Promise( (resolve)=> {

            this.sendRequest(sRequestName, sRequestData);

            this.socket.on(this.sServerSocketApi+sRequestName, function(resData)  {

                /*console.log('SOCKET RECEIVED: ');
                console.log(resData);*/

                resolve(resData);

            }) ;

        });
    }

    public sendMessage(msg) {
        return this.sendRequest("message",msg);
    }

    /*
        Sending Request and Obtain the Observable Object
     */
    public sendRequestObservable(sRequestName, sRequestData){

        var result = this.sendRequest(sRequestName, sRequestData);

        return this.setSocketReadObservable(sRequestName);
    }

    public setSocketReadObservable(sRequestName){

        if ((sRequestName !== "connect")&&(sRequestName !== "disconnect"))
            sRequestName = this.sServerSocketApi+sRequestName;

        let observable = new Observable<any>(observer => {
            this.socket.on(sRequestName, (data) =>{
               observer.next(data);
            });
        });
        return observable;

        /*let listenerSocket = Observable.fromEvent(this.socket, sRequestName);

        listenerSocket.subscribe((payload) => {
            console.log("Socket received on: "+sRequestName);
            console.log(payload);

            callBackFunction(this, payload);
        });*/
    }

    protected changeSocketStatus(data : any) {
        this.currentSocketServiceStatusObservable.next(data);
    }

}