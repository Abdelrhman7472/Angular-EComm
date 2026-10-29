import { Component } from '@angular/core';
import { ProductsSharedComponent } from '../../../shared/components/products-shared/products-shared.component';
import { ProductsSliderComponent } from './products-slider/products-slider.component';
import { MainSliderComponent } from './main-slider/main-slider.component';

@Component({
  selector: 'app-home',
  imports: [ProductsSharedComponent,ProductsSliderComponent, MainSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
