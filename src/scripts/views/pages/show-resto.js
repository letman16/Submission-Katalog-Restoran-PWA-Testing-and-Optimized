import HungerDB from '../../data/hungerdb-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const ShowResto = {
  async render() {
    return `
    <main class="hero">
    <picture>
    <source class="lazyload" media="(max-width: 600px)" data-srcset="./images/hero-image_1-small.jpg">
    <img class="lazyload hero-image" src="./images/hero-image_1-large.jpg" alt="Hero Image">
  </picture>
      <div class="hero-content">
        <h1>Welcome to <b id="napp">Hunger Apps</b></h1>
        <p>Discover the best restaurants near you!</p>
      </div>
    </main>
    <div class="content">
      <h2 class="content__heading uc">Now in Restaurants</h2>
      <div id="loadingIndicator" style="text-align: center; padding: 50px" class="loading-indicator">Loading...</div>
      <div id="restaurants" class="restaurants">
     
      </div>
    </div>
    `;
  },

  async afterRender() {
    const restaurantsContainer = document.querySelector('#restaurants');
    const loadingIndicator = document.querySelector('#loadingIndicator');

    loadingIndicator.style.display = 'block';

    const restaurants = await HungerDB.showResto();

    if (restaurants.restaurants.length === 0) {
      restaurantsContainer.innerHTML = '<h1>Tidak ada data tersedia.</h1>';
    } else {
      loadingIndicator.style.display = 'none';
      restaurants.restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML
          += createRestaurantItemTemplate(restaurant);
      });
    }
  },
};

export default ShowResto;
