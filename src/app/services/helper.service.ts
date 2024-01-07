import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string, action: string,option:any) {
    this._snackBar.open(message, action,option);
  }

 

  camelCasetoTitleCase(text:string) {
    const result = text.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  }
  makeCamelCase(text:string) {
    var result = text
      .trim()
      .toLowerCase()  //lower case everything
      .replace(/([^A-Z0-9]+)(.)/ig, //match multiple non-letter/numbers followed by any character
        function (match) {
          return arguments[2].toUpperCase();  //3rd index is the character we need to transform uppercase
        }
      );
    return result;
  }

  
  
  formatPrice(n:any, currency:any) {  
    let formatedAmount =  currency + parseFloat(n).toFixed(2).replace(/./g, function(c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
    return formatedAmount = formatedAmount.toString().replace('$-', '-$')
  }

}
