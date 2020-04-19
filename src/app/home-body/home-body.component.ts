import { Component, OnInit, Pipe } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { Router } from '@angular/router';
import { ProviderList } from '../provider-list.model';
@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.css']
})
export class HomeBodyComponent implements OnInit {
  providerList: Array<any>=[];
  @Pipe({
    name: 'filter'
  })
  searchText: any;
  constructor(private getData: GetDataService,
    private router: Router) { }

  ngOnInit(): void {
    this.getDataM();
  }
  providerClick(providerUid){
     this.router.navigate([`/providerSelected/${providerUid}`])
  }
  getDataM(){
    this.getData.getProviderData().subscribe((providerList)=>{
       providerList.find((data)=>{    
              this.providerList.push(data);    
       });
    });
  }
}
