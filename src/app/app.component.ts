import { Component, OnChanges } from '@angular/core';
import { SocketioService } from './services/socketio.service';
import { ProductsService } from './services/product.service';
import { HelpersService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';
import { Product } from './interfaces/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private socketService: SocketioService,
    private productsService: ProductsService,
    private helpersService: HelpersService,
    private router: Router
  ) {}
  title = 'product-management';
  ngOnInit() {
    this.socketService.setupSocketConnection();
    this.socketService.socket.on('productAdded', (data: Product) => {
      this.productsService.productAdded(null);
      if (this.router.url === '/pages/products') {
        this.helpersService.openSnackBar(
          'A new product has been added and table is refreshed',
          'Undo',
          {
            duration: 6000,
          }
        );
      } else {
        this.helpersService.openSnackBar(
          'A new product has been added.Kindly check the dashboard page',
          'Undo',
          {
            duration: 6000,
          }
        );
      }
    });
  }
}
