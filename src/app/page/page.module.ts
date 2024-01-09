import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageRoutingModule } from './page.routing.module';
import { RouterModule } from '@angular/router';
import { ComponentModule } from '../component/component.module';
import { ProductComponent } from './product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './product-form/product-form.component';
import { ViewProductComponent } from './view-product/view-product.component';

import { WalletComponent } from './wallet/wallet.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [ProductComponent, ProductFormComponent, WalletComponent,ViewProductComponent],
  imports: [
    CommonModule,
    PageRoutingModule,
    RouterModule,
    ComponentModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class PageModule { }
