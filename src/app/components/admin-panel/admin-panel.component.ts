import { Component } from '@angular/core';
import { ColorComponent } from '../color/color.component';
import { BrandComponent } from '../brand/brand.component';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from '../customer/customer.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [ColorComponent, BrandComponent,CustomerComponent, CommonModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent {
  activeComponent: string | null = null; // Aktif bileşeni tutacak

  showComponent(component: string) {
    this.activeComponent = component; // Aktif bileşeni ayarla
  }
}
