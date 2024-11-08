import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss'],
})
export class ManageCategoryComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  categories: Category[] = [];
  action: string = 'add';
  categoryName: string = '';
  selectedCategoryId: string = '';
  updatedCategoryName: string = ''; 
  
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  closeModal() {
    this.close.emit();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  addCategory() {
    const newCategory: Category = { name: this.categoryName, id: '' };
    this.categoryService.addCategory(newCategory).subscribe(() => {
      this.loadCategories();
      this.categoryName = '';
    });
  }

  removeCategory() {
    this.categoryService.removeCategory(this.selectedCategoryId).subscribe(() => {
      this.loadCategories();
    });
  }

  updateCategory() {
    const updatedCategory: Category = { id: this.selectedCategoryId, name: this.updatedCategoryName };
    this.categoryService.updateCategory(this.selectedCategoryId, updatedCategory).subscribe(() => {
      this.loadCategories();
      this.updatedCategoryName = '';
    });
  }
}
