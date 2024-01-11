import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorDetail, User } from 'src/app/interfaces/auth';
import { Product } from 'src/app/interfaces/product';
import { DialogService } from 'src/app/services/dialog.service';
import { HelpersService } from 'src/app/services/helper.service';
import { ProductsService } from 'src/app/services/product.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  subs = new Subscription();
  @ViewChild('paginator') paginator: MatPaginator;
  currentUser:User

  constructor(
    private productService: ProductsService,
    private helpersService: HelpersService,
    private dialog: DialogService,
    private router: Router,
    private dataService: DataService,

  ) {}
  displayedColumns: string[] = [
    'image',
    'name',
    'price',
    'quantity',
    'desc',
    'SKU',
    'actions',
  ];
  // dataSource: Product[] = [];
  dataSource: MatTableDataSource<Product>;

  ngOnInit() {
    let currentUser = this.dataService.getItem('user');
    this.initEvents();
    this.getProducts(currentUser?._id);
  }

  getProducts(userId:string | undefined) {
    this.productService.getProducts({userId:userId}).subscribe(
      (res) => {
        // this.dataSource = res.data;
        this.dataSource = new MatTableDataSource(res.data);

        this.dataSource.paginator = this.paginator;

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

  initEvents() {
    this.subs.add(
      this.productService.productAdded$.subscribe(() => {
        this.getProducts(this.currentUser?._id);
      })
    );
  }
  onEdit(element: Product) {
    this.router.navigate([`/pages/product-form/${element._id}`]);
  }

  onView(element: Product) {
    this.router.navigate([`/pages/view-product/${element._id}`]);
  }
  onDelete(element: Product) {
    this.dialog
      .openDialog({
        message: 'Are you sure you want to delete this product?',
        title: 'Alert',
      })
      .subscribe((isConfirm) => {
        if (isConfirm) {
          this.productService.deleteProduct(element._id).subscribe(
            (res) => {
              this.getProducts(this.currentUser?._id);
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
      });
  }
}
