import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  // host: { ngSkipHydration: '' },
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value);

      this.authService.register(registerModel).subscribe(
        (response) => {
          this.toastrService.info(response.message, 'Register successful');

          localStorage.setItem('token', response.data.token);
        },
        (responseError) => {
          this.toastrService.error(responseError.error, 'Register failed');
          console.log(responseError);
        }
      );
    }
  }
}
