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
        this.socket = io('127.0.0.1:3000/api');

        let listener = Observable.fromEvent(this.socket, 'message');

        listener.subscribe((payload) => {
            console.log(payload);
        });

        let listener2 = Observable.fromEvent(this.socket, 'news');

        listener2.subscribe((payload) => {
            console.log(payload);

            this.getRequest("hello","data");
            this.sendMessage("data22");
        });

    }

    public sendMessage(msg) {
        return this.socket.emit('message', msg);
    }

    public getRequest(sRequestName, sRequestData){
        return this.socket.emit(sRequestName, sRequestData);
    }


}