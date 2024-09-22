import { Component } from '@angular/core';
import { Category } from '../interfaces';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss'],
})
export class LegendComponent {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {
    this.categories = this.categoryService.getCategories();
    console.log('Categories in Legend:', this.categories); // Check if categories are fetched
  }
}