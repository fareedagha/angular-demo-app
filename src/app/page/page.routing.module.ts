import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './page.component';
import { ProductComponent } from './product/product.component';
import { WalletComponent } from './wallet/wallet.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: '', component: ProductComponent },
            { path: 'products', component: ProductComponent },
            { path: 'wallet', component: WalletComponent },

        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PageRoutingModule { }
