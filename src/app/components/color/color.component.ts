import { Component, OnInit } from '@angular/core';
import { Color } from '../../models/color';
import { ColorService } from '../../services/color.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-color',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './color.component.html',
  styleUrl: './color.component.css',
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  currentColor:Color | null = null;

  dataLoaded = false;

  constructor(private colorService: ColorService) {}
  ngOnInit(): void {
    this.getColors();
  }

  setCurrentColor(color:Color){
    this.currentColor = color;
  }

  clearCurrentColor(){
    this.currentColor = null;
  }

  getCurrentColorClass(color:Color){
    if(this.currentColor==color){
      return "list-group-item active";
    }else{
      return "list-group-item";
    }

  }

  
  getColors() {
    this.colorService.getColors().subscribe((colors) => {
      this.colors = colors.data;
      this.dataLoaded = true;
    });
  }
}
