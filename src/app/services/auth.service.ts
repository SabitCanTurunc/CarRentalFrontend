import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from "jwt-decode";
import { LoginModel } from '../models/loginModel';
import { TokenModel } from '../models/tokenModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from '../models/register';

@Injectable({
  providedIn: 'root', // Servis kök seviyesinde sağlanıyor
})
export class AuthService {
  private apiUrl = 'https://localhost:7117/api/Auth/';

  constructor(private httpClient: HttpClient, private toastrService: ToastrService) {} // ToastrService'i ekle

  login(user: LoginModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + 'login', user);
  }
  register(user: RegisterModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + 'register', user);
  }


  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Token varsa true döner
  }

  // Token'ı decode etme fonksiyonu
  decodeToken(token: string): any {
    return jwtDecode(token); // Token'ı decode eder
  }


isAdmin(): boolean {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken: any = this.decodeToken(token); // Token'ı decode et
    // Doğru anahtar ile rolü kontrol et
    if (decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === 'admin') {
      this.toastrService.info('Admin yetkisine sahipsiniz.');
      return true; // Admin ise true döner
    }
  }
  this.toastrService.error('Admin yetkisine sahip değilsiniz.'); // Hata mesajı göster
  return false; // Token yoksa veya admin değilse false döner
}

}
