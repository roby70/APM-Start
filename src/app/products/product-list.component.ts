import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product-service";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    showImage: boolean = false;
    errorMessage: string;
    private _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this._listFilter ? this.performFilter(this._listFilter) : this.products;
    }
    filteredProducts: IProduct[];
    products: IProduct[];
    constructor(private _productService: ProductService) {
    }
    toggleImage(): void {
        this.showImage = !this.showImage;
    }
    ngOnInit(): void {
        this._productService.getProducts()
            .subscribe(
                data => {
                        this.products = data;
                        this.filteredProducts = this.products;
                },
                error => this.errorMessage = <any>error);
        
        console.log('In OnInit');
    }
    private performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
            product.productName.toLocaleLowerCase().indexOf(filterBy) > -1);
        
    }
    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}