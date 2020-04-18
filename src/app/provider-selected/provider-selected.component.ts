import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { GetDataService } from '../get-data.service';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-provider-selected',
  templateUrl: './provider-selected.component.html',
  styleUrls: ['./provider-selected.component.css']
})
export class ProviderSelectedComponent implements OnInit {
  providerSelected: Array<any>=[];
  mealPackage: Array<any>=[];
  constructor( public route:ActivatedRoute, private router: Router, private getData: GetDataService) { }
  uid: string;
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('uid')){
              this.uid =paramMap.get('uid');
              this.getdata(paramMap.get('uid'));
              this.getMealData(paramMap.get('uid'));
          }
      else{
        this.router.navigate(["/"]);
      }
  });
  }

  pay(mealName){
    this.router.navigate([`/providerSelected/${this.uid}/meal/${mealName}`]);
  }
  getdata(uid){
     this.getData.getOnSelectProvider(uid).subscribe((data)=>{
      this.providerSelected.push(data);
     });
  }
  getMealData(uid){
    this.getData.getMealPackages(uid).subscribe((data)=>{
        data.find((find)=>{
         this.mealPackage.push(find);
      });
});
  }
}