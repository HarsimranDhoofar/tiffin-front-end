import { Injectable, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  
 uid: any;
 public data:any=[];
 private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  constructor(
    private afAuth: AngularFireAuth,
    private db:AngularFirestore,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService
  ) { }
  login(email: any, password: any) {
    this.afAuth.signInWithEmailAndPassword(email, password)
       .catch(error =>{
        this.eventAuthError.next(error);
       })
       .then(userCredential =>{
         if(userCredential){
           this.saveInLocal("userId", userCredential.user.uid);
           
         }
       })
  }
  logOut(key){
    this.deleteFromStorage(key);
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
  
}
