import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SettingService } from './setting.service';
import { Settings } from '../interfaces/settings';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {
  private wikipediaSuggestions = 'https://${lang}.wikipedia.org/w/api.php?origin=*&action=opensearch&format=json&formatversion=2&search=${query}&namespace=0&limit=10';
  private lang = 'en';

  constructor(private http: HttpClient, private settingService: SettingService) {
    this.settingService.getSettings().subscribe((settings: Settings) => {
      this.lang = settings.lang;
      this.wikipediaSuggestions = this.wikipediaSuggestions.replace('${lang}', this.lang);
    });
  }

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
