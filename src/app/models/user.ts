export class User {
    public firstName: string;
    public lastName: string;
    public email: string;
    public avatarUrl: string;
    public creationDate: string;
    public preferredLang: string;
    public connected: boolean = false;

    public constructor( data: any = {}) {
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.email = data.email || '';
        this.avatarUrl = data.avatarUrl || '';
        this.creationDate = data.creation_date || Date.now();
        this.preferredLang = data.preferredLang || data.language || null;
        this.connected = data.connected || false;
    }

    public getName() {
        return this.firstName + ' ' + this.lastName;
    }
}
