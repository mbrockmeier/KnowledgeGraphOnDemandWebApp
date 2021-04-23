import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {

  constructor(private loaderService: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.match('.*wikipedia.*')) {
      return next.handle(req);
    }

    this.showLoader();
    return next.handle(req).pipe(
      debounceTime(1000),
      tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.onEnd();
      }
    },
      (err: any) => {
        this.onEnd();
    }));
  }

  private onEnd(): void {
    this.hideLoader();
  }
  private showLoader(): void {
    this.loaderService.show();
  }
  private hideLoader(): void {
    this.loaderService.hide();
  }
}
