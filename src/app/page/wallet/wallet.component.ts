import { Component } from '@angular/core';
import { HelpersService } from 'src/app/services/helper.service';
import { WalletService } from 'src/app/services/wallet.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ErrorDetail } from 'src/app/interfaces/auth';
import { wallet } from 'src/app/interfaces/wallet';
import { DialogService } from 'src/app/services/dialog.service';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent {
  displayedColumns: string[] = [
    'Type',
    'Date',
    'Amount',
    'Status',
    "Checkout Details",
    'Message',
    'Details',
  ];
  dataSource = [];
  walletCreated: boolean = true;
  walletData: wallet = {
    totalAmount: 0,
    totalTopup: 0,
    totalWidraw: 0,
    totalPurchase: 0,
    _id: '',
    userId: '',
  };

  transactions = [];

  constructor(
    private walletService: WalletService,
    private helpersService: HelpersService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private transactionService: TransactionService,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    const currentUser = this.dataService.getItem('user');
    this.getWallet(currentUser?._id);
    this.getTransactions(currentUser?._id);
  }
  getWallet(userId: string | undefined) {
    if (userId) {
      this.walletService.getWalletByUserId(userId).subscribe(
        (res) => {
          this.walletData = res.wallet;
          console.log('resssss', this.walletData);
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
  }

  getTransactions(userId: string | undefined) {
    if (userId) {
      this.transactionService.getTransactions({ userId: userId }).subscribe(
        (res) => {
          this.dataSource = res.data;
          console.log('transactions', this.transactions);
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
  }
  openPaymentForm(isDeposit: boolean) {
    this.dialog
      .openPaymentDialog({
        isDeposit,
      })
      .subscribe((isConfirm) => {
        console.log('confirmmr', isConfirm);
        if (isConfirm) {
          const currentUser = this.dataService.getItem('user');
          this.getWallet(currentUser?._id);
          this.getTransactions(currentUser?._id);
        }
      });
  }
}
