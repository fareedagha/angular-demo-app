export interface wallet {
  totalAmount: number;
  totalTopup: number;
  totalWidraw: number;
  totalPurchase: number;
  _id: string;
  userId: string | undefined;
}

export interface PaymentDialogData {
  isDeposit: boolean;
}
export interface CheckoutDialogData {
  userId: string |undefined;
  productId:string;
}

