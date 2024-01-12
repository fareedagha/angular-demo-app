import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorDetail } from 'src/app/interfaces/auth';
import { PaymentDialogData } from 'src/app/interfaces/wallet';
import { DataService } from 'src/app/services/data.service';
import { HelpersService } from 'src/app/services/helper.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent {
  paymentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PaymentDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: PaymentDialogData,

    private fb: FormBuilder,
    private dataService: DataService,
    private walletService: WalletService,
    private helpersService: HelpersService

  ) { 

    this.paymentForm = this.fb.group({    
      amount: [
        null,
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
    });

  }

  submitPay(){
    const currentUser = this.dataService.getItem('user');
    const payload = {...this.paymentForm.value, userId: currentUser?._id}
    if(this.data.isDeposit){
      this.walletService.topUp(payload).subscribe(
        (res) => {
         this.dialogRef.close(true)
        },
        (err) => {
          console.log('error', err);
          if (err.error.details) {
            err.error.details.forEach((err: ErrorDetail) => {
              console.log('err', err);
              this.helpersService.openSnackBar(err.message, 'Close', {
                duration: 6000,
                panelClass: ['style-error'],
              });
            });
          }
        }
      );

    }else{

      this.walletService.widthraw(payload).subscribe(
        (res) => {
         this.dialogRef.close(true)
        },
        (err) => {
          console.log('error', err);
          if (err.error.details) {
            err.error.details.forEach((err: ErrorDetail) => {
              console.log('err', err);
              this.helpersService.openSnackBar(err.message, 'Close', {
                duration: 6000,
                panelClass: ['style-error'],
              });
            });
          }
        }
      );

    }



  }

}
