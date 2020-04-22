import { Injectable, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { StripeToken } from 'stripe-angular';
import { NgxSpinnerService } from "ngx-spinner";
@Injectable({
  providedIn: 'root'
})
export class GetDataService {
 
  
  
 uid: any;
 public data:any=[];
 private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  newProviderVar: any;
  constructor(
    private afAuth: AngularFireAuth,
    private db:AngularFirestore,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private spinner: NgxSpinnerService
  ) { }
  login(email: any, password: any) {
    this.spinner.show();
    this.afAuth.signInWithEmailAndPassword(email, password)
       .catch(error =>{
        this.spinner.hide();
        this.eventAuthError.next(error);
       })
       .then(userCredential =>{
         if(userCredential){
          this.spinner.hide();
           this.saveInLocal("userId", userCredential.user.uid); 
         }
       })
  }
  newCustomer(newCustomerData){
    this.spinner.show();
     this.afAuth.createUserWithEmailAndPassword(newCustomerData.email, newCustomerData.password)
     .then( userCredential => {
        this.newProviderVar = newCustomerData

        userCredential.user.updateProfile({
         displayName: newCustomerData.serviceName
        });

        this.insertUserData(userCredential).then(() =>{
            console.log("New User Added")
            this.spinner.show();
            this.login(newCustomerData.email, newCustomerData.password);
        });
     })
     .catch(error => {
       this.spinner.hide();
       this.eventAuthError.next(error)
     })
   }
  insertUserData(userCredential: import("firebase").auth.UserCredential) {
    this.spinner.hide();
    return this.db.doc(`Customers/${userCredential.user.uid}`).set({
      deliveryAddress: this.newProviderVar.deliveryAddress,
      email: this.newProviderVar.email,
      firstName: this.newProviderVar.firstName,
      lastName: this.newProviderVar.lastName,
      profileImg: "",
      uid: userCredential.user.uid,
      
    });
    
  }
  updateProvider(value: any) {
    return this.db.doc(`Customers/${this.storage.get("userId")}`).update({
      deliveryAddress: value.deliveryAddress,
      email: value.email,
      firstName: value.firstName,
      lastName: value.lastName,
      profileImg: "",
      uid: this.storage.get("userId"),
      
    }).then(()=>{
      window.location.reload();
      });
          
  }
  logOut(key){
    this.deleteFromStorage(key);
  }
  getCurrentSubscription(){
    return this.db.collection(`Customers`).doc(`${this.storage.get("userId")}`).collection(`currentSubscription`).doc(`stripetoken`).valueChanges();
  }
  getProviderData(){
    return  this.db.collection(`Providers`).valueChanges();
  }
  getOnSelectProvider(uid: any) {
    return this.db.collection(`Providers`).doc(`${uid}`).valueChanges();
  }
  getMealPackages(uid:any){
    this.uid =uid;
    return this.db.collection(`Providers`).doc(`${uid}`).collection(`mealPackage`).valueChanges();
  }
  getSelectMealPackage(packageSelected){
    if(this.uid == null || this.uid == ""){
      this.router.navigate(["/"]);
      return null;
    }
    else{
      return  this.db.collection(`Providers`).doc(`${this.uid}`).collection(`mealPackage`).doc(packageSelected).valueChanges();
    }
  } 
  getUserData(uid: any) {
    return  this.db.collection(`Customers`).doc(`${uid}`).valueChanges();
  }
  saveInLocal(key, val): void {
    console.log('recieved= key:' + key + 'value:' + val);
    this.storage.set(key, val);
    this.data[key]= this.storage.get(key);
    window.location.reload();
   }
   deleteFromStorage(key): void {
    this.storage.remove(key);
    console.log("Logout");
    window.location.reload();
   }
   pay(token: StripeToken, name: any, price: any, providerName: any, firstName: any, lastName:any, deliveryAddress: any, email:any) {
    this.db.collection(`Customers`).doc(`${this.storage.get("userId")}`).collection(`currentSubscription`).doc(`stripetoken`).set({
      tokenId: token.id,
      cardnumber: token.card.last4,
      price: price,
      name:name,
      providerName: providerName
    });
    this.db.collection(`Providers`).doc(`${this.uid}`).collection(`currentsub`).doc(`${this.storage.get("userId")}`).set({
      deliveryAddress: deliveryAddress,
      email:email,
      firstName:firstName,
      lastName:lastName,
      packagePrice:price,
      packageSubscribedName:name,
      paymentDate: new Date(),
      paymentId:token.id,
      paymentState:"Approved",
      profileImg:"",
      uId:this.storage.get("userId")
    }).then(()=>{
      this.router.navigate(["/"]);
    });
  }
}
