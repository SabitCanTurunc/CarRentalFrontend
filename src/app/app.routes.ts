import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CarAddComponent } from './components/car-add/car-add.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', pathMatch: "full", component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/details/:carId', component: CarDetailsComponent },
  { path: 'cars/add', component: CarAddComponent },
  { path: 'login', component: LoginComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule,ToastrModule.forRoot({
    timeOut: 3000, // Bildirimlerin 3 saniye görünme süresi
    positionClass: 'toast-top-right', // Bildirimlerin ekranın sağ üst köşesinde görünmesi
    preventDuplicates: true, // Aynı mesajın birden fazla kez görünmesini engelle
    closeButton: true, // Bildirimde kapatma butonu göster
    progressBar: true, // İlerleme çubuğu göster
    enableHtml: true, // HTML içeriğine izin ver
    tapToDismiss: true // Bildirimi tıkladığında kapat
  }),],
  exports: [RouterModule]  
})
export class AppRoutingModule {}
 