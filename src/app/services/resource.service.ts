import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JSONResource } from '../interfaces/jsonresource';
import { map, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private resourceUrl = 'http://localhost:4200/kgod/resource/';

  constructor(private http: HttpClient) { }

  getResource(requestedResource: string): Observable<JSONResource> {
    const requestUrl = this.resourceUrl + requestedResource;
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.get(requestUrl, {
      headers
    }).pipe(map((jsonResource: JSONResource) => {
      return jsonResource;
    }));
  }
}