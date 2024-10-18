import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Tarayıcıda olup olmadığımızı kontrol et
    if (isPlatformBrowser(this.platformId)) {
      // LocalStorage'dan token'ı al
      const token = localStorage.getItem('token');

      // Eğer token varsa, Authorization başlığını ekleyerek isteği kopyala
      if (token) {
        const clonedRequest = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        });

        // Klonlanan istekle devam et
        return next.handle(clonedRequest);
      }
    }

    // Token yoksa veya tarayıcıda değilsek, orijinal istekle devam et
    return next.handle(req);
  }
}
