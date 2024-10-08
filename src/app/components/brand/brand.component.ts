import { Component, OnInit } from '@angular/core';
import { Brand } from '../../models/brand';
import { BrandService } from '../../services/brand.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css',
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  dataLoaded = false;
  currentBrand:Brand | null = null;

  constructor(private brandService: BrandService) {}

  ngOnInit():void {
    this.getBrand();
  }

  getBrand() {
    this.brandService.GetBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand = brand;

  }
  clearCurrentBrand() {
    this.currentBrand = null;
  }
  getCurrentBrandClass(brand:Brand){
    if(this.currentBrand==brand){
      return "list-group-item active";
    }else{
      return "list-group-item";
    }
  }
}
