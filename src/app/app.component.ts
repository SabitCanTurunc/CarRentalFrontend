import { Component } from '@angular/core';
import { provideRouter, RouterOutlet } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { NaviComponent } from './components/navi/navi.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  
  imports: [
    RouterOutlet,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    CommonModule,
    NaviComponent,
    HttpClientModule,
    ToastrModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  
  title = 'CarRental';
}
