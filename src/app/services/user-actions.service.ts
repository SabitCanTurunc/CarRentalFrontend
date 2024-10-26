import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserActionsService {

  constructor() { }

  getNameFromToken(): string | null {
    // LocalStorage'dan token'ı al
    const token = localStorage.getItem('token'); // 'token' ifadesini kendi token anahtarınızla değiştirin
    // console.log('Token retrieved from localStorage:', token); // Token'ın alındığını logla

    if (!token) {
      // console.log('No token found, returning null'); // Token yoksa logla
      return null; // Token yoksa null döner
    }

    // Token'ı decode et
    const payload = JSON.parse(atob(token.split('.')[1])); // JWT'nin payload kısmını alır
    // console.log('Decoded payload:', payload); // Decode edilmiş payload'u logla

    // İsim bilgisini döndür
    const userName = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    // console.log('User name extracted from token:', userName); // Kullanıcı adını logla

    return userName || null;



  }

  logout(){
    localStorage.removeItem('token');
  }


 
}
