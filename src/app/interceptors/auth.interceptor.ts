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

      console.log('Token var mıı:', token); // Token'in olup olmadığını logla

      if (token) {
        // Token süresini kontrol et
        if (this.checkTokenExpiration(token)) {
          // console.log('Token geçerli, istek gönderiliyor.');
          const clonedRequest = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`),
          });

          return next.handle(clonedRequest).pipe(
            catchError((err) => {
              console.error('HTTP isteği hatası:', err);
              return throwError(err);
            })
          );
        } else {
          // console.warn("Token süresi dolmuş, localStorage'dan silindi.");
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
          return throwError({ error: 'Token geçersiz veya süresi dolmuş.' });
        }
      } else {
        console.warn('Token bulunamadı.');
      }
    }

    return next.handle(req);
  }

  private checkTokenExpiration(token: string | null): boolean {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));

        if (!payload.exp) {
          console.error('Token süresi bilgisi bulunamadı.');
          return false;
        }

        const expiration = new Date(payload.exp * 1000); // Payload'daki 'exp' süresini milisaniyeye çeviriyoruz
        const now = new Date();

        // console.log('Token süresi:', expiration); // Token bitiş süresini loglama
        // console.log('Şu anki zaman:', now); // Şu anki zamanı loglama

        if(expiration > now){
          return true;
        }
        
      } catch (error) {
        console.error('Token çözme hatası:', error); // Token'ı decode ederken oluşan hatayı logluyoruz
      }
    }
    return false;
  }
}
