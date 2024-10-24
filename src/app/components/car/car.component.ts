import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { VatAddedPipe } from '../../pipes/vat-added.pipe';
import { FormsModule } from '@angular/forms';
import { CarFilterPipePipe } from '../../pipes/car-filter-pipe.pipe';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';
import { CarImageService } from '../../services/car-image.service';
import { Image } from '../../models/image';
import { ColorComponent } from '../color/color.component';
import { BrandComponent } from '../brand/brand.component';



@Component({
  selector: 'app-car',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    VatAddedPipe,
    CarFilterPipePipe,
    FormsModule,
    ColorComponent,
    BrandComponent,
    
  ],
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  filterText: string | null = null;
  dataLoaded = false;
  images: { [key: number]: Image[] } = {}; // carId ile resimleri ilişkilendiriyoruz

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService: CartService,
    private carImageService: CarImageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else {
        this.getCars();
      }
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
      this.loadImagesForCars(); // Tüm arabaların resimlerini yükle
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrandId(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
      this.loadImagesForCars(); // Tüm arabaların resimlerini yükle
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColorId(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
      this.loadImagesForCars(); // Tüm arabaların resimlerini yükle
    });
  }

  loadImagesForCars() {
    this.cars.forEach((car) => {
      this.getImages(car.carId); // Her araç için resimleri yükle
    });
  }

  getImages(carId: number) {
    this.carImageService.GetImages(carId).subscribe((response) => {
      this.images[carId] = response.data;
    });
  }

  addToCart(car: Car) {
    if (car.carId === 1) {
      this.toastrService.error('Hata', 'Bu ürün sepete eklenemez');
    } else {
      this.toastrService.success('Sepete eklendi', car.brandName);
      this.cartService.addToCart(car);
    }
  }
}
