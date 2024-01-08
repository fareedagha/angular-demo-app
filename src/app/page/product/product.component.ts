import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/component/confirm-dialog/confirm-dialog.component';
import { Product } from 'src/app/interfaces/product';
import { DialogService } from 'src/app/services/dialog.service';
import { HelpersService } from 'src/app/services/helper.service';
import { ProductsService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  subs = new Subscription();
  constructor(
    private productService: ProductsService,
    private helpersService: HelpersService,
    private dialog: DialogService) {
  }
  displayedColumns: string[] = ['image', 'name', 'price', 'quantity', 'desc', 'SKU', 'actions'];
  dataSource: any = [];

  ngOnInit() {
    this.initEvents();
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(res => {
      this.dataSource = res.data
    }, err => {
      if (err.error.details) {
        err.error.details.forEach((err: any) => {
          this.helpersService.openSnackBar(err.message, 'Undo', {
            duration: 2000,
            panelClass: ["style-error"]
          })

        });
      }
    });
  }

  initEvents() {
    this.subs.add(
      this.productService.productAdded$.subscribe(
        () => {
          this.getProducts()
        }
      )
    )
  }
  onEdit(element: Product) {

  }
  onDelete(element: Product) {
    this.dialog.openDialog({ message: 'Are you sure you want to delete this product?', title: 'Alert' }).subscribe(isConfirm => {
      if (isConfirm) {
        this.productService.deleteProduct(element._id).subscribe(res => {
          this.getProducts()
        }, err => {
          if (err.error.details) {
            err.error.details.forEach((err: any) => {
              this.helpersService.openSnackBar(err.message, 'Undo', {
                duration: 2000,
                panelClass: ["style-error"]
              })

            });
          }
        });
      }
    })
  }
}
