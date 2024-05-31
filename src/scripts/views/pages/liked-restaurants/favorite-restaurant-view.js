/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantView {
  getTemplate() {
    return `
      <div class="content">
        <input id="query" type="text" placeholder="Cari Film Favorite Anda">
        <h2 class="content__heading">Your Favorite Restaurant</h2>

          <div id="restaurants" class="restaurants">
          </div>
      </div>
    `;
  }

  getFavoriteMovieTemplate() {
    return `
      <div class="content">
        <h2 class="content__heading">Your Favorite Restaurant</h2>
   
        <div id="restaurants" class="restaurants">
        </div>
      </div>
    `;
  }

  _getEmptyRestaurantTemplate() {
    return `
      <div class="restaurant-item__not__found">
        Tidak ada restaurant untuk ditampilkan
      </div>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurants) {
    // this.showRestaurants(restaurants);
    if (!restaurants) return;
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }
    document.getElementById('restaurants').innerHTML = html;
    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));
  }
}
export default FavoriteRestaurantView;
