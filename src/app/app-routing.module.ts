import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: 'pages', canActivate: [AuthGuard], loadChildren: () => import('./page/page.module').then(res => res.PageModule) }
];

const config: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled'
}
@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
