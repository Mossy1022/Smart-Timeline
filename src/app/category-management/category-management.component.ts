// category-management.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Category } from '../interfaces';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent implements OnInit {
  categories: Category[] = [];
  categoryForm!: FormGroup;
  editingCategory: Category | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategories();

    // Initialize the form
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      color: ['#2196F3'], // Default color
      icon: ['']
    });
  }

  loadCategories(): void {
    this.categories = this.categoryService.getCategories();
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const category: Category = this.categoryForm.value;
      if (this.editingCategory) {
        // Update existing category
        category.id = this.editingCategory.id;
        this.categoryService.updateCategory(category);
        this.editingCategory = null;
      } else {
        // Add new category
        category.id = this.generateUniqueId();
        this.categoryService.addCategory(category);
      }
      this.categoryForm.reset({ color: '#2196F3' });
      this.loadCategories();
    }
  }

  onEdit(category: Category): void {
    this.editingCategory = category;
    this.categoryForm.patchValue(category);
  }

  onDelete(category: Category): void {
    this.categoryService.deleteCategory(category.id);
    this.loadCategories();
  }

  onCancelEdit(): void {
    this.editingCategory = null;
    this.categoryForm.reset({ color: '#2196F3' });
  }

  private generateUniqueId(): string {
    // Simple unique ID generator
    return 'category-' + Math.random().toString(36).substr(2, 9);
  }
}