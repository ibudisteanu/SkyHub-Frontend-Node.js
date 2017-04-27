import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

//import { Configuration } from '../../app.constants';


@Injectable()
export class SocketIoService{

    protected socket = null;

    constructor(
        //private config: Configuration
    )
    {
        console.log('Client Socket Constructor');

        this.createClientSocket();
    }

    private createClientSocket()
    {
        //this.socket = io(this.config.Socket_Server_API);
        this.socket = io('127.0.0.1:3000');

        this.socket.on('connect',function() {
            console.log('Client has connected to the server!');
        });


        this.socket.on('news', function(res){
            console.log('news');
            console.log(res);
        });

        this.setSocketReadObservable("connectionReady", function (response){
            console.log("Connection Ready: ");
            console.log(response);

            this.sendRequestSolve("api/version",'',function (res){
                console.log("API VERSION");
            });
        });


        // Add a connect listener
        this.socket.on('message',function(data) {
            console.log('Received a message from the server!',data);
        });

        // Add a disconnect listener
        this.socket.on('disconnect',function() {
            console.log('The client has disconnected!');
        });

    }

    public sendMessage(msg) {
        return this.sendRequest("message",msg);
    }

    public sendRequest(sRequestName, sRequestData){
        return this.socket.emit(sRequestName, sRequestData);
    }

    public sendRequestSolve(sRequestName, sRequestData, callBackFunction){

        var result = this.sendRequest(sRequestName, sRequestData);

        if (typeof callBackFunction !== 'undefined')
            this.setSocketReadObservable(sRequestName, callBackFunction);

        return result;
    }

    public setSocketReadObservable(sRequestName, callBackFunction){
        let listenerSocket = Observable.fromEvent(this.socket, sRequestName);

        listenerSocket.subscribe((payload) => {
            console.log("Socket received on: "+sRequestName);
            console.log(payload);

            callBackFunction(payload);
        });
    }

}