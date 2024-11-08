import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  selectedCategoryId: string | null = null;

  onCategorySelected(categoryId: string | null) {
    this.selectedCategoryId = categoryId;
  }  
}
