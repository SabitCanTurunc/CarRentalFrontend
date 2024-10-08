import { Component } from '@angular/core';
import { CarImageService } from '../../services/car-image.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Image } from '../../models/image';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'] // Düzeltildi
})
export class CarDetailsComponent {
  images: Image[] = []; 
  dataLoaded = false;

  constructor(
    private imageService: CarImageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
        const carId = Number(params["carId"]); // Parametreyi sayıya dönüştür
        this.getImages(carId);
    });
}



getImages(carId:number){
    this.imageService.GetImages(carId).subscribe((response) => {
      this.images = response.data; 
      this.dataLoaded = true;
    });
  }


  
}
