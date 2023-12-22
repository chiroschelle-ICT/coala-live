export class Users
{
    Id!: null;
    name: string;
    afdeling: string;
    afdelingId: string;
    email: string;
    wachtwoord: string;
    rights: number;
    userId: string;
    constructor(Id:null, name:string, email:string, afdeling:string, afdelingId:string, wachtwoord:string, rights:number, userId:string)
    {
        this.Id = Id;
        this.name = name;
        this.email = email;
        this.afdeling = afdeling;
        this.afdelingId = afdelingId;
        this.wachtwoord = wachtwoord;
        this.rights = rights;
        this.userId = userId;
    }
}