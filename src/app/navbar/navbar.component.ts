import { Component, OnInit, Inject } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { Router, NavigationEnd } from '@angular/router';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  mySubscription: any;
  isLoggedIn: boolean;
  customerdata: Array<any> =[];

  constructor(private getData: GetDataService,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

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

  getdata(){
    this.getData.getUserData(this.storage.get("userId")).subscribe((data)=>{
        this.customerdata.push(data);
    });
  }
  logout(){
    this.getData.deleteFromStorage("userId");
  }
}
