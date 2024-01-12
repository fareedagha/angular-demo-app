import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorDetail } from 'src/app/interfaces/auth';
import {
  CheckoutDialogData,
  PaymentDialogData,
} from 'src/app/interfaces/wallet';
import { DataService } from 'src/app/services/data.service';
import { HelpersService } from 'src/app/services/helper.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss'],
})
export class CheckoutFormComponent {
  checkoutForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CheckoutDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: CheckoutDialogData,

    private fb: FormBuilder,
    private dataService: DataService,
    private walletService: WalletService,
    private helpersService: HelpersService
  ) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: [
        '',
        Validators.compose([
          Validators.required,
          // Validators.pattern(/^\+?[1-9]\d{1,14}$/),
          Validators.minLength(11), Validators.maxLength(11)
        ]),
      ],
      address: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ]),
      ],
    });
  }

  submitForm() {
    const payload = {
      checkoutDetail:{...this.checkoutForm.value},
      productId: this.data.productId,
      userId: this.data.userId,
    };
    this.walletService.buyProduct(payload).subscribe(
      (res) => {
        this.helpersService.openSnackBar('Your product checkout successfully done!', 'Close', {
          duration: 4000
        });
        this.dialogRef.close(true);
      },
      (err) => {
        console.log('error', err);
        if (err.error.details) {
          err.error.details.forEach((err: ErrorDetail) => {
            console.log('err', err);
            this.helpersService.openSnackBar(err.message, 'Close', {
              duration: 4000,
            });
          });
        }
      }
    );
  }
}
