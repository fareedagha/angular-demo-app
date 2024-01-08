import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageRoutingModule } from './page.routing.module';
import { RouterModule } from '@angular/router';
import { ComponentModule } from '../component/component.module';
import { ProductComponent } from './product/product.component';



@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    PageRoutingModule,
    RouterModule,
    ComponentModule
  ]
})
export class PageModule { }
