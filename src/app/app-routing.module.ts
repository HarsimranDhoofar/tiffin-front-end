import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeBodyComponent } from './home-body/home-body.component';
import { ProviderSelectedComponent } from './provider-selected/provider-selected.component';
import { PaymentComponent } from './payment/payment.component';
const routes: Routes = [
  {path:'', component: HomeBodyComponent},
  {path:'providerSelected/:uid', component: ProviderSelectedComponent}, 
  {path:'providerSelected/:uid/meal/:mealName', component: PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
