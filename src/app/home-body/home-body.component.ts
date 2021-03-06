import { Component, OnInit, Pipe } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProviderList } from '../provider-list.model';
@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.css']
})
export class HomeBodyComponent implements OnInit {
  providerList: Array<any>=[];
  currentSubscription: Array<any>=[];
  isSubscribed: boolean = false;
  @Pipe({
    name: 'filter'
  })
  searchText: any;
  constructor(private getData: GetDataService,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getDataM();
    this.getCurrentSubscription()
  }
  providerClick(providerUid){
     this.router.navigate([`/providerSelected/${providerUid}`])
  }
  getDataM(){
    this.spinner.show;
    this.getData.getProviderData().subscribe((providerList)=>{
       providerList.find((data)=>{    
              this.providerList.push(data); 
              this.spinner.hide();   
       });
    });
  }
  getCurrentSubscription(){
    this.getData.getCurrentSubscription().subscribe((data)=>{
        if(data == null || data ==" "){
          this.isSubscribed = false;
        }
        else{
          this.isSubscribed = true;
          this.currentSubscription.push(data);
        }
        
    })
  }
}
