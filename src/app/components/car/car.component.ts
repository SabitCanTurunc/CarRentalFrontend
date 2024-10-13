import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { VatAddedPipe } from "../../pipes/vat-added.pipe";
import { FormsModule } from '@angular/forms';
import { FilterPipePipe } from '../../pipes/filter-pipe.pipe';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    VatAddedPipe,
    FilterPipePipe,
    FormsModule,
  ],
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  currentCar: Car | null = null;
  filterText: string | null = null;
  dataLoaded = false;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService ,
    private cartService:CartService,
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
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrandId(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColorId(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  setCurrentCar(car: Car) {
    this.currentCar = car;
    
  }

  clearCurrentCar() {
    this.currentCar = null;
  }

  addToCart(car:Car){
    if(car.carId===1){
      this.toastrService.error("Hata","Bu ürün sepete eklenemez")
    }else{
      this.toastrService.success("Sepete eklendi",car.brandName)
      this.cartService.addToCart(car);
    }
 
}
}
