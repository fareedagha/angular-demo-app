import { Component } from '@angular/core';
import { HelpersService } from 'src/app/services/helper.service';
import { ProductsService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ErrorDetail, User } from 'src/app/interfaces/auth';
import { DialogService } from 'src/app/services/dialog.service';
import { DataService } from 'src/app/services/data.service';

import { Subscription } from 'rxjs';
@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
})
export class ViewProductComponent {
  private routeSub: Subscription | undefined;
  id: string = '';
  product: Product | undefined;
  currentUser: User | null;
  constructor(
    private productService: ProductsService,
    private helpersService: HelpersService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: DialogService,
    private dataService: DataService,
  ) {}

  ngOnInit() {
    this.currentUser = this.dataService.getItem('user');
    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getProduct();
    });
  }
  getProduct() {
    if (this.id) {
      this.productService.getProduct(this.id).subscribe(
        (res) => {
          this.product = res;
          console.log('productdata', this.product);
        },
        (err) => {
          if (err.error.details) {
            err.error.details.forEach((err: ErrorDetail) => {
              this.helpersService.openSnackBar(err.message, 'Close', {
                duration: 2000,
                panelClass: ['style-error'],
              });
            });
          }
        }
      );
    }
  }
  onBack() {
    this.router.navigate(['/pages/products']);
  }

  
  openCheckoutForm(productId:string,userId:string | undefined) {
    this.dialog
      .openCheckoutDialog({
        productId,
        userId
      })
      .subscribe((isConfirm) => {
        console.log('confirm', isConfirm);
        if (isConfirm) {
          this.getProduct();
        }
      });
  }
}
