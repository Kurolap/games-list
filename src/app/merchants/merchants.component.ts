import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.scss'],
})
export class MerchantsComponent implements OnInit {
  loading = true;
  title = 'Merchants List';
  merchants = [];

  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.gamesService.fetchGamesData().subscribe((gamesData) => {
      const { merchants } = gamesData;
      this.merchants = Object.values(merchants);
      this.loading = false;
    });
  }
}
