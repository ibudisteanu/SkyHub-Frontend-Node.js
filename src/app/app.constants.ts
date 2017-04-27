import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public HTTP_Server: string = 'http://myskyhub.ddns.net:3000/';
    public HTTP_Server_API: string = 'api';

    public Socket_Server: string = 'myskyhub.ddns.net:3000';
    public Socket_Server_API: string = 'api/';

    public serverSocketApi = this.Socket_Server + this.Socket_Server_API;
    public serverHTTPApi = this.HTTP_Server + this.HTTP_Server_API;
}
