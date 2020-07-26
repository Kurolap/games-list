import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { MerchantsComponent } from './merchants/merchants.component';

const routes: Routes = [
  { path: '', component: GamesComponent },
  { path: 'merchants', component: MerchantsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
