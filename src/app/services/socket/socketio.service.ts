import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';


@Injectable()
export class SocketIoService{

    protected sServerAddress = 'http://localhost:3000';
    protected socket = null;

    constructor() {

        console.log('Client Socket Constructor');

        this.createClientSocket();
    }

    private createClientSocket()
    {
        this.socket = io(this.sServerAddress);

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