import { Component, OnInit } from '@angular/core';
import { StripeToken, StripeSource } from "stripe-angular";
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GetDataService } from '../get-data.service';
import {
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  packageSelected: any;
  paymentPackage: Array<any>=[];
  constructor(public route:ActivatedRoute, private router: Router, private getData: GetDataService ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('mealName')){
            this.packageSelected = paramMap.get('mealName');
          }
      else{
        this.router.navigate(["/"]);
      }
  });
    this.getData.getSelectMealPackage(this.packageSelected).subscribe((data)=>{
      this.paymentPackage.push(data);
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
  }
 
  setStripeSource( source:StripeSource ){
    console.log('Stripe source', source)
  }
 
  onStripeError( error:Error ){
    console.error('Stripe error', error)
  }
}
