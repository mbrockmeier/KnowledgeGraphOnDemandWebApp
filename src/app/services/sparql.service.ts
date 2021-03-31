import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SparqlResult } from '../interfaces/sparql';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SparqlService {
  private sparqlUrl = "http://localhost:4200/kgod/sparql/"
  constructor(private http: HttpClient) { }
  getResult(requestedResource: string, txtSparql:string): Observable<SparqlResult> {
    const requestUrl = this.sparqlUrl +requestedResource;
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    let body = new FormData();
    body.append("textarea",txtSparql);
    return this.http.post(requestUrl, body,{
      headers
    }).pipe(map((jsonResource: SparqlResult) => {
      return jsonResource;
    }));
  }
}
