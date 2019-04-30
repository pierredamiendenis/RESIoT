import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import {MatSliderModule} from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StartChaseComponent } from './start-chase/start-chase.component';
import { StopChaseComponent } from './stop-chase/stop-chase.component';
import { SpeedChaseComponent } from './speed-chase/speed-chase.component';
import { OrderChaseComponent } from './order-chase/order-chase.component';
import { DisconnectComponent } from './disconnect/disconnect.component';
import { LampeComponent } from './lampe/lampe.component';
import { FooterComponent } from './footer/footer.component';
import { ConnectionComponent } from './connection/connection.component';
import { LoadingComponent } from './loading/loading.component';
import { SocketService } from './services/socket.service';
import { IpAddressComponent } from './ip-address/ip-address.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StartChaseComponent,
    StopChaseComponent,
    SpeedChaseComponent,
    OrderChaseComponent,
    DisconnectComponent,
    LampeComponent,
    FooterComponent,  
    ConnectionComponent,
    LoadingComponent,
    IpAddressComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,   
    MatSliderModule,
    FormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule

  ],
  providers: [
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
