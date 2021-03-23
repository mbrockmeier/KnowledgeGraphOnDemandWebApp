import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private resourceUrl = 'http://localhost:4200/kgod/resource/';

  constructor(private http: HttpClient) { }

  getResourceXml(requestedResource: string): Observable<Blob> {
    const requestUrl = this.resourceUrl + requestedResource;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/rdf+xml');

    return this.http.get(requestUrl, {
      headers,
      responseType: 'blob'
    });
  }

  getResourceTurtle(requestedResource: string): Observable<Blob> {
    const requestUrl = this.resourceUrl + requestedResource;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'text/turtle');

    return this.http.get(requestUrl, {
      headers,
      responseType: 'blob'
    });
  }

  getResourceNTriples(requestedResource: string): Observable<Blob> {
    const requestUrl = this.resourceUrl + requestedResource;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/n-triples');

    return this.http.get(requestUrl, {
      headers,
      responseType: 'blob'
    });
  }
}
