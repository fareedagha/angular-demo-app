import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  constructor(private productService: ProductsService) {
  }
  displayedColumns: string[] = ['image', 'name', 'price', 'quantity', 'desc', 'SKU', 'actions'];
  dataSource: any = [];

  ngOnInit() {
    this.productService.getProducts().subscribe(res => {
      this.dataSource = res.data
      console.log(this.dataSource)
    })
  }

  onEdit(element: Product) {

  }
  onDelete(element: Product) {

  }
}
