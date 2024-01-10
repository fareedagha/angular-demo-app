import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelpersService } from 'src/app/services/helper.service';
import { ProductsService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, retry } from 'rxjs';
import { AddProduct } from 'src/app/interfaces/product';
import { DataService } from 'src/app/services/data.service';
import { ErrorDetail } from 'src/app/interfaces/auth';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  image: string = '';
  productForm: FormGroup;
  private routeSub: Subscription | undefined;
  id: string = '';
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private productService: ProductsService,
    private helpersService: HelpersService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      image: [''],
      quantity: [null, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      sku: [null, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      desc: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000),
        ]),
      ],
      price: [
        null,
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
    });
  }
  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getProduct();
    });
  }

  getProduct() {
    if (this.id) {
      this.productService.getProduct(this.id).subscribe(
        (res) => {
          console.log('res', res);
          this.productForm.patchValue(res);
          console.log(this.productForm.value);
        },
        (err) => {
          if (err.error.details) {
            err.error.details.forEach((err: ErrorDetail) => {
              this.helpersService.openSnackBar(err.message, 'Undo', {
                duration: 2000,
                panelClass: ['style-error'],
              });
            });
          }
        }
      );
    }
  }
  submitProduct() {
    if (this.id) {
      this.editProduct(this.id, this.productForm.value);
    } else {
      this.saveProduct(this.productForm.value);
    }
  }
  async editProduct(id: string, values: AddProduct) {
    const res = await this.uploadImage(this.selectedFile);
    console.log('url', res);
    // Handle success
    console.log('Image uploaded successfully:', res);
    const payload = {
      ...values,
      image: res ? res?.url : values.image,
    };
    this.productService.updateProduct(id, payload).subscribe(
      (res) => {
        this.router.navigate(['/pages/products']);
      },
      (err) => {
        console.log('error', err);
        if (err.error.details) {
          err.error.details.forEach((err: ErrorDetail) => {
            console.log('err', err);
            this.helpersService.openSnackBar(err.message, 'Undo', {
              duration: 2000,
              panelClass: ['style-error'],
            });
          });
        }
      }
    );
  }
  saveProduct(values: AddProduct) {
    this.uploadImage(this.selectedFile)
      .then((res) => {
        // Handle success
        console.log('Image uploaded successfully:', res);
        const payload = {
          ...values,
          image: res?.url,
          createdByUserId: this.dataService.getData()._id,
        };
        this.productService.addProduct(payload).subscribe(
          (res) => {
            this.router.navigate(['/pages/products']);
          },
          (err) => {
            console.log('error', err);
            if (err.error.details) {
              err.error.details.forEach((err: ErrorDetail) => {
                console.log('err', err);
                this.helpersService.openSnackBar(err.message, 'Undo', {
                  duration: 2000,
                  panelClass: ['style-error'],
                });
              });
            }
          }
        );
      })
      .catch((error) => {
        // Handle error
        console.error('Error uploading image:', error);
      });
  }
  selectedFile: any = null;

  onFileSelected(event: any): void {
    console.log(event);
    this.selectedFile = event.target.files[0] ?? null;
  }
  optimizeImage(imageUrl: string) {
    var urlParts = imageUrl.split('/upload');
    console.log('hh', urlParts);
    var optimizedImage =
      urlParts[0] +
      '/upload/c_scale,dpr_auto,f_auto,q_auto,w_auto' +
      urlParts[1];
    this.image = optimizedImage;
  }
  removeImage() {
    this.productForm.get('image')!.setValue('');
  }
  uploadImage(value: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!value) {
        resolve(undefined);
      }
      const reader = new FileReader();

      reader.onload = (event) => {
        const imgElement: any = document.createElement('img');

        imgElement.src = reader.result as string;

        imgElement.onload = (e: any) => {
          const canvas = document.createElement('canvas');
          const max_width = 600;

          const scaleSize = max_width / e.target.width;
          canvas.width = max_width;
          canvas.height = e.target.height * scaleSize;

          const ctx: any = canvas.getContext('2d');
          ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);
          const srcEncoded = ctx.canvas.toDataURL('image/jpeg');
          this.http
            .post(
              'https://api.cloudinary.com/v1_1/dgfhv3nyx/image/upload',
              {
                file: srcEncoded,
                upload_preset: 'ml_default',
                folder: 'demo-images',
              },
            )
            .subscribe(
              (res: any) => {
                console.log('res', res);
                resolve(res);
              },
              (error: any) => {
                console.error('Error uploading image to Cloudinary:', error);
                reject(error);
              }
            );
        };
      };

      reader.readAsDataURL(value);
    });
  }
}
