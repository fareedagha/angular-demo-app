import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../component/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../interfaces/product';
import { PaymentDialogData } from '../interfaces/wallet';
import { PaymentFormComponent } from '../component/payment-form/payment-form.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  matDialog = inject(MatDialog);

  constructor() {}

  openDialog<T>(data: ConfirmDialogData): Observable<boolean> {
    return this.matDialog
      .open(ConfirmDialogComponent, {
        data: data,
        disableClose: true,
      })
      .afterClosed();
  }

  openPaymentDialog<T>(data: PaymentDialogData): Observable<boolean> {
    return this.matDialog
      .open(PaymentFormComponent, {
        data: data,
        disableClose: true,
      })
      .afterClosed();
  }
}
