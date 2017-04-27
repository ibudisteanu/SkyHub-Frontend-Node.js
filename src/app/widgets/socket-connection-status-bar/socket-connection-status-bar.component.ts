import { Component }  from '@angular/core';
import { Router }             from '@angular/router';
import { SocketIoService}        from '../../services/rest/socket/socketio.service';

@Component({
    selector: 'app-socket-connection-status-bar',
    templateUrl: './socket-connection-status-bar.component.html'
})
export class SocketConnectionStatusBarComponent {

    private display: boolean = false;
    private description : string = 'Problem with your internet connection';

    constructor(
        private socketServ: SocketIoService
    ) {
        // getting the data from the services
        this.socketServ.currentSocketServiceStatusObservable.subscribe((data) => {
            this.display = data.display;

            if (data.hasOwnProperty('description'))
                this.description = data.description;

        });
    }

}
