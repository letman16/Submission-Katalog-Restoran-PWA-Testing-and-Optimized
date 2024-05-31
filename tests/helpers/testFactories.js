/* eslint-disable import/prefer-default-export */
import LikeButtonInitiator from '../../src/scripts/utils/like-button-presenter';
import FavoriteHungerAppsIdb from '../../src/scripts/data/favorite-hungerapp-idb';

const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteRestaurants: FavoriteHungerAppsIdb,
    restaurant,
  });
};
export { createLikeButtonPresenterWithRestaurant };
