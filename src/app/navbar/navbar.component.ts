import { Component, OnInit, Inject } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { Router } from '@angular/router';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private getData: GetDataService,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit(): void {
    
    if(this.storage.get("userId") == null || this.storage.get("userId") == "" ){
      this.isLoggedIn = false;
    }
    else{
      this.isLoggedIn = true;
    }
    
  }
  login(frm1){
    this.getData.login(frm1.value.email, frm1.value.password);
    
  }
}
