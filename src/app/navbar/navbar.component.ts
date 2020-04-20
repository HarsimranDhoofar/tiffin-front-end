import { Component, OnInit, Inject } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { Router, NavigationEnd } from '@angular/router';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  mySubscription: any;
  isLoggedIn: boolean = false;
  customerdata: Array<any> =[];

  constructor(private getData: GetDataService,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    
    if(this.storage.get("userId") == null || this.storage.get("userId") == "" ){
      this.isLoggedIn = false;
    }
    else{
      this.isLoggedIn = true;
      this.getdata();
    }
    
  }
  login(frm1){
    this.getData.login(frm1.value.email, frm1.value.password);
    
  }
  newAccount(frm){
    console.log("newAccount");
    console.log(frm.value);
    this.getData.newCustomer(frm.value);
}
  loginAsGuest(){
    this.getData.login("testcustomer@test.com", "test123");
  }

  getdata(){
    this.getData.getUserData(this.storage.get("userId")).subscribe((data)=>{
        this.customerdata.push(data);
    });
  }
  logout(){
    this.getData.deleteFromStorage("userId");
  }
  editProfile(form){
    console.log(form.value);
    this.getData.updateProvider(form.value);
    this.customerdata = [];
  }
}
