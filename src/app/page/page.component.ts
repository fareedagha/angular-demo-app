import { Component, OnDestroy } from '@angular/core';
// import { takeWhile } from 'rxjs/operators';
// import { NbTokenService } from '@nebular/auth';
// import { NbMenuItem } from '@nebular/theme';
// import { PagesMenu } from './pages-menu';
// import { InitUserService } from '../@theme/services/init-user.service';

declare let $: any

@Component({
  selector: 'ngx-pages',
  styleUrls: [],
  template: `
    <div>
      <app-sidebar></app-sidebar>
    </div>
  `,
})
export class PagesComponent implements OnDestroy {

//   menu: NbMenuItem[];
  alive: boolean = true;

  constructor(
    // private pagesMenu: PagesMenu,
    // private tokenService: NbTokenService,
    // protected initUserService: InitUserService,
  ) {
    this.initMenu();

    // this.tokenService.tokenChange()
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe(() => {
    //     this.initMenu();
    //   });
  }

  initMenu() {
    console.log('>>>>>>>')
    // this.pagesMenu.getMenu()
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe(menu => {
    //     this.menu = menu;
    //   });
  }



  ngOnDestroy(): void {
    this.alive = false;
  }
}