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

@Component({
  selector: 'app-car-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './car-add.component.html',
  styleUrl: './car-add.component.css',
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
    });
  }

  add() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      this.carService.add(carModel).subscribe(
        (data) => {
          this.toastrService.success(data.message, 'Sucess!');
        },
        (dataError) => {
          if(dataError.error.Errors.length>0){

            for (let index = 0; index < dataError.error.Errors.length; index++) {
            this.toastrService.error(dataError.error.Errors[index].ErrorMessage, 'Error');
              
            }

          }
        }
      );
    } else {
      this.toastrService.error('Form is invalid', 'Error');
    }
  }
}
