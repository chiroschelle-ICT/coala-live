export class Leden
{
    Id!: null;
    naam: string;
    voornaam: string;
    email: string;
    afdeling: string;
    afdelingId: number;
    telefoon: number;
    Address: string;
    betaald: boolean;
    geboortedatum: string;
    constructor(id:null,naam:string, voornaam:string, email:string, afdeling:string, afdelingId:number, telefoon:number, Address:string, betaald:boolean, geboortedatum:string)
    {
        this.Id = id;
        this.naam = naam;
        this.voornaam = voornaam;
        this.email = email;
        this.afdeling = afdeling;
        this.afdelingId = afdelingId;
        this.telefoon = telefoon;
        this.Address = Address;
        this.betaald = betaald;
        this.geboortedatum = geboortedatum;
    }
}