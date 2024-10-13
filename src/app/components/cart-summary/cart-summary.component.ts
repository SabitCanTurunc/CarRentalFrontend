import { CartItem } from '../../models/carItem';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css',
})
export class CartSummaryComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCart();
  }
  getCart() {
    this.cartItems = this.cartService.list();
    console.log(this.cartItems);
  }
  removeFromCart(car: Car) {
    this.cartService.removeFromCart(car);
    this.toastrService.show(car.brandName+" "+car.description+' removed from cart!', 'Deleted');
  }
}
