import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CarService } from '../../services/car.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-car-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'], // 'styleUrl' yerine 'styleUrls' kullanılmalı
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService
  ) {}
  
  ngOnInit(): void {
    this.createCarAddForm();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
    });
  }

  add() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      this.carService.add(carModel).pipe(
        catchError((dataError) => {
          if (dataError.error && dataError.error.Errors && dataError.error.message && dataError.error.Errors.length > 0) {
            for (let i = 0; i < dataError.error.Errors.length; i++) {
              this.toastrService.error(dataError.error.Errors[i].ErrorMessage, "Doğrulama hatası");
            }
          } else if (dataError.error && dataError.error.message) {
            // dataError.error.message var ise bunu da göster
            this.toastrService.error(dataError.error.message, "Hata");
          } else {
            this.toastrService.error("Bilinmeyen bir hata oluştu", "Hata");
          }
          return of(null); // Hata durumunda boş bir değer döndür
        })
      ).subscribe((data) => {
        if (data) {
          this.toastrService.success(data.message, 'Success!');
        }
      });
    } else {
      this.toastrService.error('Form is invalid', 'Error');
    }
  }
  
}
