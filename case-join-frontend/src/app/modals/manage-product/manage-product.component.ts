import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss'],
})
export class ManageProductComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  products: Product[] = [];
  categories: Category[] = [];
  action: string = 'add';
  productName: string = '';
  productPrice: number = 0;
  categoryId: string = '';
  selectedProductId: string = '';
  updatedProductName: string = '';
  updatedProductPrice: number = 0;
  updatedCategoryId: string = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  closeModal() {
    this.close.emit();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  addProduct() {
    const newProduct: Product = {
      name: this.productName,
      price: this.productPrice,
      categoryId: this.categoryId,
    };
    this.productService.addProduct(newProduct).subscribe(() => {
      this.loadProducts();
      this.productName = '';
      this.productPrice = 0;
      this.categoryId = '';
    });
  }

  removeProduct() {
    this.productService.removeProduct(this.selectedProductId).subscribe(() => {
      this.loadProducts();
    });
  }

  updateProduct() {
    const updatedProduct: Product = {
      id: this.selectedProductId,
      name: this.updatedProductName,
      price: this.updatedProductPrice,
      categoryId: this.updatedCategoryId,
    };
    this.productService
      .updateProduct(this.selectedProductId, updatedProduct)
      .subscribe(() => {
        this.loadProducts();
        this.updatedProductName = '';
        this.updatedProductPrice = 0;
        this.updatedCategoryId = '';
      });
  }
}
