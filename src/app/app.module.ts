import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeBodyComponent } from './home-body/home-body.component';
import { ProviderSelectedComponent } from './provider-selected/provider-selected.component';
import { PaymentComponent } from './payment/payment.component';
import {FormsModule} from '@angular/forms';
import { StripeModule } from "stripe-angular"
import { StorageServiceModule} from 'angular-webstorage-service';
import { FooterComponent } from './footer/footer.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeBodyComponent,
    ProviderSelectedComponent,
    PaymentComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StripeModule.forRoot("pk_test_TM7OZXVg3HYW87b8KY8cOzIg00kukIY7nL"),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    StorageServiceModule,
    AngularFirestoreModule,
    FormsModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
