export interface AddProduct {
    name: string,
    price: number,
    quantity: number,
    sku: string,
    desc: string,
    image: string
}

export interface Product {
    name: string,
    price: number,
    quantity: number,
    sku: string,
    desc: string,
    image: string,
    createdAt: string,
    _id: string
}

export interface ConfirmDialogData {
    title: string;
    message : string;
}