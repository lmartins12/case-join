import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showManageCategoriesModal: boolean = false;
  showManageProductsModal: boolean = false;

  openManageCategoriesModal() {
    this.showManageCategoriesModal = true;
    this.showManageProductsModal = false;
  }

  openManageProductsModal() {
    this.showManageProductsModal = true;
    this.showManageCategoriesModal = false;
  }

  closeManageCategoriesModal() {
    this.showManageCategoriesModal = false;
  }

  closeManageProductsModal() {
    this.showManageProductsModal = false;
  }
}
