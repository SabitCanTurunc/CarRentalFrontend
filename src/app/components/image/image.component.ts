import { Component, OnInit } from '@angular/core';
import { Image } from '../../models/image';
import { CarImageService } from '../../services/car-image.service';
import { response } from 'express';
import { getRandomValues } from 'crypto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.css'
})
export class ImageComponent implements OnInit  {

  images: Image[] = [];
  dataLoaded = false;

  constructor(private imageService:CarImageService,
    private activatedRoute: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getImages(params["details"])
    });
  }

  public getImages(carId:number){
    this.imageService.GetImages(carId).subscribe((response) => {
      this.images = response.data; 
    });
  }
  

}
