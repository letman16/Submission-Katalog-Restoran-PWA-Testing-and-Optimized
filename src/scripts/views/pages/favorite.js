/* eslint-disable no-new */
/* eslint-disable no-undef */
/* eslint-disable max-len */
import FavoriteRestaurantIdb from '../../data/favorite-hungerapp-idb';
// import { createRestaurantItemTemplate } from '../templates/template-creator';
import FavoriteRestaurantView from './liked-restaurants/favorite-restaurant-view';

import FavoriteRestaurantPresenter from './liked-restaurants/favorite-restaurant-show-presenter';
import FavoriteRestaurantSearchPresenter from './liked-restaurants/favorite-restaurant-search-presenter';

const view = new FavoriteRestaurantView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestaurantPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
    new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
  },
};

export default Favorite;
