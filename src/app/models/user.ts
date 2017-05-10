export class User {

    public bLoggedIn : boolean;

    public firstName: string;
    public lastName: string;
    public email: string;
    public username : string;

    public profilePic : string;
    public coverPic : string;

    public preferredLang: string;
    public connected: boolean = false;

    public country : string;
    public city : string;

    public dtCreation : number;
    public dtLastActivity : number;

    public sessionCredential : string;

    public constructor( data: any = {}) {


        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';

        this.email = data.email || '';
        this.username = data.username || '';

        this.preferredLang = data.preferredLang || data.language || null;
        this.connected = data.connected || false;

        this.profilePic = data.profilePic || '';
        this.coverPic  = data.coverPic || '';

        this.country = data.country || '';
        this.city = data.city || '';
        this.dtCreation = data.dtCreation || Date.now();
        this.dtLastActivity = data.dtLastActivity || Date.now();

        console.log('User assigned');
    }

    public getName() {
        return this.firstName + ' ' + this.lastName;
    }
}
