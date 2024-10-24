import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router'; // Router servisini ekleyin

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');

      console.log('Token:', token); // Log the retrieved token

      if (token) {
        if (this.checkTokenExpiration(token)) {
          console.log('Token geçerli, istek gönderiliyor.'); // Log valid token
          const clonedRequest = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`),
          });
          // Klonlanan istekle devam et
          return next.handle(clonedRequest).pipe(
            catchError((err) => {
              console.error('HTTP isteği hatası:', err);
              return throwError(err); // Hata durumunda hatayı tekrar fırlat
            })
          );
        } else {
          // Token süresi dolmuşsa,
          localStorage.removeItem('token');
          console.warn("Token süresi dolmuş, localStorage'dan silindi."); // Log token removal

          this.router.navigate(['/login']);
          return throwError({ error: 'Token geçersiz veya süresi dolmuş.' });
        }
      } else {
        console.warn('Token bulunamadı.'); // Log when no token is found
      }
    }

    // Token yoksa veya tarayıcıda değilsek, orijinal istekle devam et
    return next.handle(req);
  }

  private checkTokenExpiration(token: string | null): boolean {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiration = new Date(payload.exp * 1000);
        const now = new Date();

        console.log('Token süresi:', expiration); // Log expiration date
        console.log('Şu anki zaman:', now); // Log current time

        return expiration > now;
      } catch (error) {
        console.error('Token çözme hatası:', error);
      }
    }
    return false;
  }
}
