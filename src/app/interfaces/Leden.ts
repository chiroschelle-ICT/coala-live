export class Leden
{
    naam: string;
    voornaam: string;
    email: string;
    afdeling: string;
    afdelingId: number;
    telefoon: number;
    Address: string;
    betaald: boolean;
    constructor(naam:string, voornaam:string, email:string, afdeling:string, afdelingId:number, telefoon:number, Address:string, betaald:boolean)
    {
        this.naam = naam;
        this.voornaam = voornaam;
        this.email = email;
        this.afdeling = afdeling;
        this.afdelingId = afdelingId;
        this.telefoon = telefoon;
        this.Address = Address;
        this.betaald = betaald;
    }
}