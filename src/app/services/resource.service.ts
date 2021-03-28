import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JSONResource } from '../interfaces/jsonresource';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private resourceUrl = 'http://localhost:4200/kgod/resource/';
  private ontologyUrl = 'http://localhost:4200/kgod/ontology/';

  constructor(private http: HttpClient) { }

  getResource(requestedResource: string, refreshModel: boolean, wikiBaseUrl?: string): Observable<JSONResource> {
    const requestUrl = this.resourceUrl + requestedResource;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const refreshModelParam = String(refreshModel);
    let params = new HttpParams().set('refreshModel', refreshModelParam);

    if (wikiBaseUrl !== undefined) {
      params = params.append('wikiBaseUrl', wikiBaseUrl);
    }

    return this.http.get(requestUrl, {
      headers,
      params
    }).pipe(map((jsonResource: JSONResource) => {
      return jsonResource;
    }));
  }

  getOntology(requestedOntology: string): Observable<JSONResource> {
    const requestUrl = this.ontologyUrl + requestedOntology;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(requestUrl, {
      headers
    }).pipe(map((jsonResource: JSONResource) => {
      return jsonResource;
    }));
  }
}
