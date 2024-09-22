import { Injectable } from '@angular/core';
import { Category } from '../interfaces';
import { CATEGORIES } from '../mockdata/categories-data';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = CATEGORIES;

  getCategories(): Category[] {
    return this.categories;
  }

  addCategory(category: Category): void {
    this.categories.push(category);
  }

  updateCategory(category: Category): void {
    const index = this.categories.findIndex(c => c.id === category.id);
    if (index !== -1) {
      this.categories[index] = category;
    }
  }

  deleteCategory(id: string): void {
    this.categories = this.categories.filter(c => c.id !== id);
  }
}