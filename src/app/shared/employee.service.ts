import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { companymodel } from '../Model/companymodel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http : HttpClient) { }
  apiUrl = 'http://localhost:3000/company';

  getAllCompany():Observable<companymodel[]>{
    return this._http.get<companymodel[]>(this.apiUrl);
  }

  getCompanyByCode(id:any):Observable<companymodel[]>{
    return this._http.get<companymodel[]>(this.apiUrl+'/'+id);
  }

  removeCompanyByCode(id:any){
    return this._http.delete(this.apiUrl+'/'+id);
  }

  createCompany(data:any){
    return this._http.post(this.apiUrl,data);
  }

  updateCompany(id:any,data:any){
    return this._http.put(this.apiUrl + '/' + id, data);
  }

}
