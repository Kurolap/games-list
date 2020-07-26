import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';

export type Game = {
  Name: { en: string };
  loading: boolean;
  ImageFullPath: string;
  MerchantID: string;
  CategoryID: string[];
  merchantName: string;
};
export type Games = Game[];

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  loading = true;
  games = [];
  filteredGames = [];
  categories = [];
  merchants = [];
  currentName: string = '';
  currentCategoryId: string = '';
  currentMerchantId: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  isSortAscending: boolean = true;
  isOnlyFavorite: boolean = false;
  favoritesNumber: number = 0;

  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.gamesService.fetchGamesData().subscribe((gamesData) => {
      const { games, categories, merchants } = gamesData;
      this.categories = categories;
      this.merchants = Object.values(merchants);
      this.games = this.addMercahntNameToGame(games);
      this.filteredGames = this.games; // array clone
      this.addFavoriteMarkToGame();
      this.loading = false;
    });
  }

  addMercahntNameToGame = (games) => {
    return games.map((game) => {
      const foundMerchant = this.merchants.find(
        (merchant) => game.MerchantID === merchant.ID
      );
      game.merchantName = foundMerchant.Name;
      return game;
    });
  };

  applyAllFilters = () => {
    this.filteredGames = this.games.filter((game) => {
      return (
        (game.MerchantID === this.currentMerchantId ||
          !this.currentMerchantId) &&
        (game.CategoryID.includes(this.currentCategoryId) ||
          !this.currentCategoryId) &&
        (game.Name.en.toLowerCase().indexOf(this.currentName.toLowerCase()) !==
          -1 ||
          !this.currentName) &&
        (game.isFavorite || !this.isOnlyFavorite)
      );
    });
  };

  searchByName = (value: string) => {
    this.currentName = value;
    this.applyAllFilters();
  };

  filterByCategory = (categoryId: string) => {
    this.currentCategoryId = categoryId;
    this.applyAllFilters();
  };

  filterByMerchant = (merchantId: string) => {
    this.currentMerchantId = merchantId;
    this.applyAllFilters();
  };

  sortByName = () => {
    let favoritesCount = this.favoritesNumber;
    this.filteredGames = this.filteredGames.sort((a, b) => {
      // show favorites first
      if (this.favoritesNumber && b.isFavorite && !a.isFavorite) {
        favoritesCount--;
        return 1;
      }

      if (a.Name.en > b.Name.en) return this.isSortAscending ? 1 : -1;
      else if (a.Name.en < b.Name.en) return this.isSortAscending ? -1 : 1;
      return 0;
    });
    this.isSortAscending = !this.isSortAscending;
  };

  setItemsPerPage = (value: number) => {
    this.itemsPerPage = value;
  };

  addToFavorites = (gameId: string) => {
    let favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];
    const foundId = favoriteIds.find((favoriteId) => favoriteId === gameId);
    if (foundId) {
      favoriteIds = favoriteIds.filter((favoriteId) => favoriteId !== gameId);
    } else {
      favoriteIds.push(gameId);
    }
    localStorage.setItem('favorites', JSON.stringify(favoriteIds));
    this.addFavoriteMarkToGame();
  };

  addFavoriteMarkToGame = () => {
    const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];
    this.filteredGames.map((game) => {
      const isFavorite = favoriteIds.includes(game.ID);
      game.isFavorite = isFavorite;
      game.favoriteButtonText = isFavorite
        ? 'Remove from Favorites'
        : 'Add to Favorites';
      return game;
    });
  };

  toggleFavorites = () => {
    this.isOnlyFavorite = !this.isOnlyFavorite;
    this.applyAllFilters();
  };

  setFavoritesNumber = (value: string) => {
    this.favoritesNumber = parseInt(value);
    this.sortByName();
  };
}
