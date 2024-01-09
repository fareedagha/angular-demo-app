import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './page.component';
import { ProductComponent } from './product/product.component';
import { WalletComponent } from './wallet/wallet.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ViewProductComponent } from './view-product/view-product.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: '', component: ProductComponent },
            { path: 'products', component: ProductComponent },
            { path: 'product-form', component: ProductFormComponent },
            { path: 'product-form/:id', component: ProductFormComponent },
            { path: 'product-form/:id', component: ProductFormComponent },
            { path: 'view-product/:id', component: ViewProductComponent },

            { path: 'wallet', component: WalletComponent },

        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PageRoutingModule { }
