export class Users
{
    Id!: null;
    name: string;
    afdeling: string;
    afdelingId: string;
    email: string;
    password: string;
    rights: number;
    userId: string;
    constructor(Id:null, name:string, email:string, afdeling:string, afdelingId:string, password:string, rights:number, userId:string)
    {
        this.Id = Id;
        this.name = name;
        this.email = email;
        this.afdeling = afdeling;
        this.afdelingId = afdelingId;
        this.password = password;
        this.rights = rights;
        this.userId = userId;
    }
}