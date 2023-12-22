export class Users
{
    Id!: null;
    name: string;
    afdeling: string;
    afdelingId: string;
    email: string;
    password: string;
    constructor(Id:null, name:string, email:string, afdeling:string, afdelingId:string, password:string)
    {
        this.Id = Id;
        this.name = name;
        this.email = email;
        this.afdeling = afdeling;
        this.afdelingId = afdelingId;
        this.password = password;
    }
}