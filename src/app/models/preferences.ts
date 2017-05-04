export class Preferencies {
    public profilePic: string;
    public coverPic: string;
    public preferredLang: string;

    public constructor( data: any = {}) {
        this.profilePic = data.profilePic || '';
        this.coverPic = data.coverPic || '';
        this.preferredLang = data.preferredLang || null;
    }

}
