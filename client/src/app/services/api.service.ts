import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = "http://localhost:8080/api";


  public get(entity: string, id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${entity}/${id}`, { headers: this.getHeaders() });
  }
  public getAll(entity: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${entity}`, { headers: this.getHeaders() });
  }
  public post(entity: string, obj: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${entity}`, obj, { headers: this.getHeaders() });
  }
  public put(entity: string, id: number, obj: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${entity}/${id}`, obj, { headers: this.getHeaders() });
  }
  public delete(entity: string, id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${entity}/${id}`, { headers: this.getHeaders() });
  }

  private getHeaders(): any {
    const token = localStorage.getItem("token");

    const headers = new Headers({
      'token': `${token}`
    })
    return headers;
  }

  constructor(private http: HttpClient) { }
}
