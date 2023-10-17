import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'http://localhost:3000/api';
  private checkboxUrl = 'http://localhost:3000/api/leden/updateCheckbox/'
  private apiUsersUrl = 'http://localhost:3000/api/users';
  private apiLedenUrl = 'http://localhost:3000/api/leden';
  private apiLedenAfdelingUrl = 'http://localhost:3000/api/leden/afdelingId';


  constructor(private http: HttpClient) {}

  // --- user api calls
  // get all users returns as 1 value
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUsersUrl);
  }
  // get 1 specific user according to username. returns id
  getUserPerUsername(userName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users/${userName}`)
  }


  // -- leden api calls
  // get all leden and return them as 1 value
  getLeden(): Observable<any[]> {
    return this.http.get<any[]>(this.apiLedenUrl);
  }
  getCountLeden(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/leden/count`);
  }
  // get All lid's of the parameters afdelingID
  getAfdelingId(afdelingId: any): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/leden/${afdelingId}`);
  }
  // get 1 specific lid according to the parameter (lidid)
  getLidById(lidId: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/leden/lidId/${lidId}`)
  }
  // Add lid
  postLid(naam: string, voornaam: string, afdeling: string, afdelingId: number, email: string, telefoon:string, straat:string, huisnummer:string, gemeente:string, postcode:any) {
    const url = `${this.baseUrl}/leden/addUser`;
    const body = 
    {
      naam: naam,
      voornaam: voornaam,
      afdeling: afdeling,
      afdelingId: afdelingId,
      email: email,
      telefoon: telefoon, 
      straat: straat,
      huisnummer: huisnummer,
      gemeente: gemeente,
      postcode: postcode,
    }
    return this.http.post(url, body);
  }

  // Checkbox Stuff
  updateCheckboxState(lidId: number, lidgeldBetaald: boolean) {
    const url = `${this.checkboxUrl}${lidId}`;
    const body = { checkData: lidgeldBetaald }; // Use lidgeldBetaald for checkbox state
    this.http.put<any>(url, body).subscribe()
  }

  
}
