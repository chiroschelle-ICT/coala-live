export class Users
{
    Id!: null;
    naam: string;
    afdeling: string;
    afdelingId: string;
    email: string;
    wachtwoord: string;
    rights: number;
    userId: string;
    constructor(id:null, naam:string, email:string, afdeling:string, afdelingId:string, wachtwoord:string, rights:number, userId:string)
    {
        this.Id = id;
        this.naam = naam;
        this.email = email;
        this.afdeling = afdeling;
        this.afdelingId = afdelingId;
        this.wachtwoord = wachtwoord;
        this.rights = rights;
        this.userId = userId;
    }
}