export class Leden
{
    Id!: null;
    naam: string;
    voornaam: string;
    email: string;
    email_2: string;
    afdeling: string;
    afdelingId: number;
    telefoon: number;
    Address: string;
    Opmerking: string;
    telefoon_2?: number;       // Optional data
    Address_2?: string;        // Optional data
    Opmerking_2?: string       // Optional data
    betaald: boolean;
    geboortedatum: string;
    hasSecondAddress: boolean;
    constructor(id:null,naam:string, voornaam:string, email:string,email_2:string, afdeling:string, afdelingId:number, telefoon:number, Address:string, Opmerking:string, betaald:boolean, geboortedatum:string,hasSecondAddress:boolean, telefoon_2:number, Address_2:string, Opmerking_2:string)
    {
        this.Id = id;
        this.naam = naam;
        this.voornaam = voornaam;
        this.email = email;
        this.email_2 = email_2;
        this.afdeling = afdeling;
        this.afdelingId = afdelingId;
        this.telefoon = telefoon;
        this.Address = Address;
        this.Opmerking = Opmerking;
        this.betaald = betaald;
        this.geboortedatum = geboortedatum;
        this.hasSecondAddress = hasSecondAddress;
        // Assign optional properties if provided
        if (telefoon_2 !== undefined) {
            this.telefoon_2 = telefoon_2;
        } if (Address_2 !== undefined) {
            this.Address_2 = Address_2;
        } if (Opmerking_2 !== undefined) {
            this.Opmerking_2 = Opmerking_2;
        }
    }
}