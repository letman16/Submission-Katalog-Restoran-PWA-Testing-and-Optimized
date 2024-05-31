/* eslint-disable no-undef */
import { itActsAsFavoriteRestaurantModel } from './contracts/favoriteRestaurantContract';
import FavoriteHungerAppsIdb from '../src/scripts/data/favorite-hungerapp-idb';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteHungerAppsIdb.getAllRestaurants()).forEach(async (restaurant) => {
      await FavoriteHungerAppsIdb.deleteRestaurant(restaurant.id);
    });
  });

  itActsAsFavoriteRestaurantModel(FavoriteHungerAppsIdb);
});
