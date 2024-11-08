import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() categoryId: string | null = null;
  allProducts: Product[] = [];
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryId']) {
      this.applyFilter();
    }
  }

  loadProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.allProducts = products;
      this.applyFilter();
    });
  }

  applyFilter() {
    if (this.categoryId) {
      this.products = this.allProducts.filter(
        (product) => product.categoryId === this.categoryId
      );
    } else {
      this.products = [...this.allProducts];
    }
  }
}
