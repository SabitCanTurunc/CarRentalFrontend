import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { CartItems } from '../models/cartItems';
import { CartItem } from '../models/carItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }



  addToCart(car:Car){
    let item = CartItems.find(c => c.car.carId === car.carId);
    if(item){
      item.quantity++;

    }else{
      let item = new CartItem();
      item.quantity=1;
      CartItems.push(item);
    }


  }
  list():CartItem[]{
    return CartItems;
  }


}
