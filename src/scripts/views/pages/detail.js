import HungerDB from '../../data/hungerdb-source';
import UrlParser from '../../routes/url-parser';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriteHungerAppsIdb from '../../data/favorite-hungerapp-idb';

const Detail = {
  async render() {
    return `
    <div id="loadingIndicator" style="text-align: center; padding: 50px" class="loading-indicator">Loading...</div>
      <div id="restaurant" class="restaurant"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await HungerDB.detailResto(url.id);
    const restaurantContainer = document.querySelector('#restaurant');

    const loadingIndicator = document.querySelector('#loadingIndicator');

    loadingIndicator.style.display = 'block';

    if (restaurant.length === 0) {
      loadingIndicator.style.display = 'none';
      restaurantContainer.innerHTML += '<h1>Tidak ada data Detail.</h1>';
    } else {
      loadingIndicator.style.display = 'none';
      restaurantContainer.innerHTML = createRestaurantDetailTemplate(
        restaurant.restaurant,
      );

      LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favoriteRestaurants: FavoriteHungerAppsIdb,
        restaurant: {
          id: restaurant.restaurant.id,
          name: restaurant.restaurant.name,
          description: restaurant.restaurant.description,
          pictureId: restaurant.restaurant.pictureId,
          rating: restaurant.restaurant.rating,
        },
      });
    }
  },
};

export default Detail;
