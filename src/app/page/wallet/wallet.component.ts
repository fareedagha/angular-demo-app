import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface PeriodicElement {
  Type: string;
  Amount: string;
  Status: string;
  Date: string;
  Details: string;
  Deposit_Method: string;
  Order_Id: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    Type: 'TopUp',
    Date: '22:32 Nov 16 2023',
    Amount: '100',
    Status: 'success',
    Details: '20990300034231117013342827384',
    Deposit_Method: 'WALLET_TOPUP_EASYPAISA_PK',
    Order_Id: 172837959999266,
  },
  {
    Type: 'Widtraw',
    Date: '22:32 Nov 16 2023',
    Amount: '200',
    Status: 'success',
    Details: '20990300034231117013342827384',
    Deposit_Method: 'WALLET_TOPUP_EASYPAISA_PK',
    Order_Id: 172837959999266,
  },
  {
    Type: 'purchase',
    Date: '22:32 Nov 16 2023',
    Amount: '300',
    Status: 'success',
    Details: '20990300034231117013342827384',
    Deposit_Method: 'WALLET_TOPUP_EASYPAISA_PK',
    Order_Id: 172837959999266,
  },
  {
    Type: 'TopUp',
    Date: '22:32 Nov 16 2023',
    Amount: '400',
    Status: 'success',
    Details: '20990300034231117013342827384',
    Deposit_Method: 'WALLET_TOPUP_EASYPAISA_PK',
    Order_Id: 172837959999266,
  },
  {
    Type: 'TopUp',
    Date: '22:32 Nov 16 2023',
    Amount: '500',
    Status: 'success',
    Details: '20990300034231117013342827384',
    Deposit_Method: 'WALLET_TOPUP_EASYPAISA_PK',
    Order_Id: 172837959999266,
  },
  {
    Type: 'purchase',
    Date: '22:32 Nov 16 2023',
    Amount: '600',
    Status: 'success',
    Details: '20990300034231117013342827384',
    Deposit_Method: 'WALLET_TOPUP_EASYPAISA_PK',
    Order_Id: 172837959999266,
  },
  {
    Type: 'Widtraw',
    Date: '22:32 Nov 16 2023',
    Amount: '700',
    Status: 'success',
    Details: '20990300034231117013342827384',
    Deposit_Method: 'WALLET_TOPUP_EASYPAISA_PK',
    Order_Id: 172837959999266,
  },
  {
    Type: 'purchase',
    Date: '22:32 Nov 16 2023',
    Amount: '800',
    Status: 'success',
    Details: '20990300034231117013342827384',
    Deposit_Method: 'WALLET_TOPUP_EASYPAISA_PK',
    Order_Id: 172837959999266,
  },
  {
    Type: 'TopUp',
    Date: '22:32 Nov 16 2023',
    Amount: '900',
    Status: 'success',
    Details: '20990300034231117013342827384',
    Deposit_Method: 'WALLET_TOPUP_EASYPAISA_PK',
    Order_Id: 172837959999266,
  },
  {
    Type: 'TopUp',
    Date: '22:32 Nov 16 2023',
    Amount: '1000',
    Status: 'success',
    Details: '20990300034231117013342827384',
    Deposit_Method: 'WALLET_TOPUP_EASYPAISA_PK',
    Order_Id: 172837959999266,
  },
];
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent {
  constructor(private router: Router) {}
  displayedColumns: string[] = ['Type', 'Date', 'Amount', 'Details'];
  dataSource = ELEMENT_DATA;
  walletCreated: boolean = true;
}
