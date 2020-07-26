import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { MerchantsComponent } from './merchants/merchants.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [AppComponent, GamesComponent, MerchantsComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule,
    AppRoutingModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
