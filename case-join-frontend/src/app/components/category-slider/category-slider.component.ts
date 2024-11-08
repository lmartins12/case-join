import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-slider',
  templateUrl: './category-slider.component.html',
  styleUrls: ['./category-slider.component.scss'],
})
export class CategorySliderComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  selectedCategoryId: string | null = null;
  @Output() categorySelected = new EventEmitter<string | null>();

  @ViewChild('categoriesWrapper', { read: ElementRef }) categoriesWrapper!: ElementRef;

  canScrollLeft: boolean = false;
  canScrollRight: boolean = false;

  private categoriesSubscription!: Subscription;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.categoriesSubscription = this.categoryService.getCategoriesUpdatedListener()
      .subscribe(() => {
        this.loadCategories();
      });
  }

  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.checkScrollButtons();
    });
  }

  selectCategory(categoryId: string | null) {
    this.selectedCategoryId = categoryId;
    this.categorySelected.emit(this.selectedCategoryId);
  }

  scrollLeft() {
    this.categoriesWrapper.nativeElement.scrollBy({
      left: -200,
      behavior: 'smooth',
    });
    this.updateScrollButtons();
  }

  scrollRight() {
    this.categoriesWrapper.nativeElement.scrollBy({
      left: 200,
      behavior: 'smooth',
    });
    this.updateScrollButtons();
  }

  updateScrollButtons() {
    const element = this.categoriesWrapper.nativeElement;
    this.canScrollLeft = element.scrollLeft > 0;
    this.canScrollRight = element.scrollLeft + element.clientWidth < element.scrollWidth;
  }

  checkScrollButtons() {
    setTimeout(() => {
      this.updateScrollButtons();
    }, 0);
  }

  onWheel(event: WheelEvent) {
    event.preventDefault();
    this.categoriesWrapper.nativeElement.scrollBy({
      left: event.deltaY < 0 ? -100 : 100,
    });
    this.updateScrollButtons();
  }

  startX: number = 0;
  isDown: boolean = false;

  onTouchStart(event: TouchEvent) {
    this.isDown = true;
    this.startX = event.touches[0].clientX;
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isDown) return;
    const x = event.touches[0].clientX;
    const walk = this.startX - x;
    this.categoriesWrapper.nativeElement.scrollLeft += walk;
    this.startX = x;
    this.updateScrollButtons();
  }

  onTouchEnd() {
    this.isDown = false;
  }
}
