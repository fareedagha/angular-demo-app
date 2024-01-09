import { Component, OnChanges } from '@angular/core';
import { SocketioService } from './services/socketio.service';
import { ProductsService } from './services/product.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private socketService: SocketioService, private productsService: ProductsService, private router: Router) {
  }
  title = 'product-management';
  ngOnInit() {
    this.socketService.setupSocketConnection();
    this.socketService.socket.on('productAdded', (data: any) => {
      this.productsService.productAdded(null)
      if (this.router.url === '/pages/products') {
        alert('A new product has been added and table is refreshed')
      }
      else {
        alert('A new product has been added.Kindly check the dashboard page')
      }
    });
  }

}
