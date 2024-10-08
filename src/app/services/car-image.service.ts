import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarDetailsComponent } from '../components/car-details/car-details.component';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl="https://localhost:7117/api/CarImage/getAll";
  constructor(private httpClient:HttpClient) { }


  GetImages(carId: number): Observable<ListResponseModel<Image>> {
    const body = new URLSearchParams();
    body.set('carId', carId.toString()); 

    return this.httpClient.post<ListResponseModel<Image>>(this.apiUrl, body.toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' 
        }
    });
}

  }


  

