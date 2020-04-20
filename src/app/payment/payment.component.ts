import { Component, OnInit, Inject } from '@angular/core';
import { StripeToken, StripeSource } from "stripe-angular";
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GetDataService } from '../get-data.service';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  packageSelected: any;
  paymentPackage: Array<any>=[];
  providerUid: any;
  price: any;
  name: any;
  providerName: any;
  providerdata: Array<any>=[];
  customerdata: Array<any>=[];
  customerfName: any;
  customerlNmae: any;
  delivaryAddress: any;
  email: any;
  constructor(public route:ActivatedRoute, private router: Router, private getData: GetDataService, @Inject(LOCAL_STORAGE) private storage: WebStorageService ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('mealName')){
            this.packageSelected = paramMap.get('mealName');
            this.providerUid= paramMap.get('uid');
          }
      else{
        this.router.navigate(["/"]);
      }
  });
    this.getData.getSelectMealPackage(this.packageSelected).subscribe((data)=>{
      this.paymentPackage.push(data);
      this.paymentPackage.find((datafind)=>{
            this.name = datafind['packageName'];
            this.price = datafind['price'];
      })
    });
   this.getData.getOnSelectProvider(this.providerUid).subscribe((providerData)=>{
     this.providerdata.push(providerData);
       this.providerdata.find((providerName)=>{
          this.providerName = providerName['serviceName']
       })
   });
   this.getData.getUserData(this.storage.get("userId")).subscribe((data)=>{
    this.customerdata.push(data);
    this.customerdata.find((finddata)=>{
      this.customerfName = finddata['firstName'];
      this.customerlNmae = finddata['lastName'];
      this.delivaryAddress = finddata['deliveryAddress'];
      this.email = finddata['email'];
    })
});
  }
  extraData = {
    "name": "null",
    "address_city": "null",
    "address_line1": "null",
    "address_line2": "null",
    "address_state": "null",
    "address_zip": "null"
  }
 
  onStripeInvalid( error:Error ){
    console.log('Validation Error', error)
  }
 
  setStripeToken( token:StripeToken ){
    console.log('Stripe token', token)
    this.pay(token, this.name , this.price, this.providerName , this.customerfName, this.customerlNmae, this.delivaryAddress, this.email );
  }
 
  setStripeSource( source:StripeSource ){
    console.log('Stripe source', source)
  }
 
  onStripeError( error:Error ){
    console.error('Stripe error', error)
  }
  pay(token, name, price, providerName, firstName, lastName, delivaryAddress, email){
    this.getData.pay(token,name,price, providerName, firstName, lastName, delivaryAddress, email);
  }
}
