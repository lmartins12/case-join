import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CategorySliderComponent } from './components/category-slider/category-slider.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { ManageCategoryComponent } from './modals/manage-category/manage-category.component';
import { ManageProductComponent } from './modals/manage-product/manage-product.component';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategorySliderComponent,
    ProductListComponent,
    LoginComponent,
    ProductsComponent,
    ManageCategoryComponent,
    ManageProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule  
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
