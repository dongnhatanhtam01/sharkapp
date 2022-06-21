import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()

export class ApiService {

  constructor(private _http:HttpClient) { }

  postProduct = (data: any) => {
    return this._http.post<any>("http://localhost:3000/address/", data)
  }

  getProduct = () => {
    return this._http.get<any>("http://localhost:3000/address/")
  }
  
  putProduct = (data:any, id:number) => {
    return this._http.put<any>("http://localhost:3000/address/"+id, data)
  }

  deleteProduct = (id:number) => {
    return this._http.delete<any>("http://localhost:3000/address/"+id)
  }
}
