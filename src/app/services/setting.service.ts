import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Settings } from '../interfaces/settings';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private settingsUrl = 'http://localhost:4200/kgod/settings';

  constructor(private http: HttpClient) { }

  getSettings(): Observable<Settings> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.get(this.settingsUrl, {
      headers
    }).pipe(map((settings: Settings) => {
      return settings;
    }));
  }

  updateSettings(settings: Settings) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.post(this.settingsUrl, settings, {
      headers
    });
  }
}
