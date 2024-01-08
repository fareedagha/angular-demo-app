import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelpersService } from 'src/app/services/helper.service';
import { ProductsService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  image: string = '';
  productForm: FormGroup;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private productService: ProductsService,
    private helpersService: HelpersService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      quantity: ['', Validators.required],
      sku: ['', Validators.required],
      desc: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])],
      price: ['', Validators.compose([Validators.required])],
    });
  }
  saveProduct(values: any) {
    this.uploadImage(this.selectedFile)
      .then((res) => {
        // Handle success
        console.log('Image uploaded successfully:', res);
        const payload = {
          ...values,
          image: res.url
        }
        this.productService.addProduct(payload).subscribe(res => {
          this.router.navigate(["/pages/products"]);
        }, err => {
          console.log('error', err)
          if (err.error.details) {
            err.error.details.forEach((err: any) => {
              console.log('err', err)
              this.helpersService.openSnackBar(err.message, 'Undo', {
                duration: 2000,
                panelClass: ["style-error"]
              })

            });
          }
        });
      })
      .catch((error) => {
        // Handle error
        console.error('Error uploading image:', error);
      });
  }
  selectedFile: any = null;

  onFileSelected(event: any): void {
    console.log(event)
    this.selectedFile = event.target.files[0] ?? null;
  }
  optimizeImage(imageUrl: any) {
    var urlParts = imageUrl.split('/upload')
    console.log('hh', urlParts)
    var optimizedImage = urlParts[0] + '/upload/c_scale,dpr_auto,f_auto,q_auto,w_auto' + urlParts[1];
    this.image = optimizedImage;

  }
  // uploadImage(event: any) {
  //   // new method to send image in cloudinary with size reducing
  //   const reader = new FileReader()
  //   reader.readAsDataURL(event.target.files[0])

  //   reader.onload = (event) => {

  //     const imgElement: any = document.createElement("img");

  //     imgElement.src = reader.result;

  //     imgElement.onload = (e: any) => {

  //       const canvas = document.createElement("canvas");
  //       const max_width = 600;

  //       const scaleSize = max_width / e.target.width;
  //       canvas.width = max_width;
  //       canvas.height = e.target.height * scaleSize;

  //       const ctx: any = canvas.getContext("2d")
  //       ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height)

  //       const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg")

  //       var that = this;
  //       this.http.post('https://api.cloudinary.com/v1_1/dgfhv3nyx/image/upload', { file: srcEncoded, upload_preset: 'ml_default', folder: 'demo-images' }).subscribe((res: any) => {
  //         console.log('res', res)
  //         that.optimizeImage(res['secure_url']);
  //       })
  //     }

  //   }
  // }
  uploadImage(value: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const imgElement: any = document.createElement("img");

        imgElement.src = reader.result as string;

        imgElement.onload = (e: any) => {
          const canvas = document.createElement("canvas");
          const max_width = 600;

          const scaleSize = max_width / e.target.width;
          canvas.width = max_width;
          canvas.height = e.target.height * scaleSize;

          const ctx: any = canvas.getContext("2d");
          ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

          const srcEncoded = ctx.canvas.toDataURL("image/jpeg");

          this.http.post('https://api.cloudinary.com/v1_1/dgfhv3nyx/image/upload', { file: srcEncoded, upload_preset: 'ml_default', folder: 'demo-images' })
            .subscribe(
              (res: any) => {
                console.log('res', res);
                this.optimizeImage(res['secure_url']);
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