import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export type Game = {
  Name: { en: string };
  ImageFullPath: string;
  MerchantID: string;
  CategoryID: string[];
  merchantName: string;
};
export type Merchant = {
  ID: string;
  Name: string;
};
export interface GamesData {
  games: Game[];
  categories: Object[];
  merchants: Merchant[];
}

@Injectable({ providedIn: 'root' })
export class GamesService {
  public gamesData: GamesData;

  constructor(private http: HttpClient) {}

  fetchGamesData(): Observable<GamesData> {
    return this.http
      .get<GamesData>('http://localhost:9000/games')
      .pipe(tap((gamesData) => (this.gamesData = gamesData)));
  }
}
