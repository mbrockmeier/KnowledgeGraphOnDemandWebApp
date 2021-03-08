import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {
  private wikipediaSuggestions = 'https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&format=json&formatversion=2&search=${query}&namespace=0&limit=10';

  constructor(private http: HttpClient) { }

  getSearchSuggestions(searchString: string): Observable<string[]> {
    const wikipediaQuery = this.wikipediaSuggestions.replace('${query}', searchString.replace(' ', '%20'));
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.get(wikipediaQuery, {
      headers
    }).pipe(map((response) => {
      let suggestions: string[] = [];
      suggestions = response[1];
      return suggestions;
    }));
  }
}
