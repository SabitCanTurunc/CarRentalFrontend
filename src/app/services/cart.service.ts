import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { CartItems } from '../models/cartItems';
import { CartItem } from '../models/carItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  addToCart(car: Car) {
    let item = CartItems.find((c) => c.car.carId === car.carId);
    if (item) {
      console.log('artıyor', item);
      item.quantity += 1;
    } else {
      let cartItem = new CartItem();
      cartItem.car = car;
      cartItem.quantity = 1;
      console.log(cartItem, '  item calisiyor');
      CartItems.push(cartItem);
    }
  }

  removeFromCart(car: Car) {
    let item = CartItems.find((c) => c.car.carId === car.carId);
    CartItems.splice(CartItems.indexOf(item), 1);
  }
  list(): CartItem[] {
    return CartItems;    
  }
}
