import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
  <h2 class="restaurant__name">${restaurant.name}</h2>
  <img class="lazyload restaurant__poster" data-src="${
  restaurant.pictureId
    ? `${CONFIG.BASE_IMAGE_RESTO}small/${restaurant.pictureId}`
    : 'https://picsum.photos/id/666/800/450?grayscale'
}"  crossorigin="anonymous" alt="${restaurant.name}" caption="${restaurant.name}">
  <div class="restaurant__info">
    <h3>Information</h3>
    <h4>Address</h4>
    <p>${restaurant.address}</p>
    <h4>City</h4>
    <p>${restaurant.city}</p>
    <h4>Category</h4>
    <p>${restaurant.categories.map((category) => category.name).join(', ')}</p>
    <h4>Rating</h4>
    <p>⭐️ ${restaurant.rating}</p>
  </div>
  <div class="restaurant__overview">
    <h3>Overview</h3>
    <p>${restaurant.description}</p>
  </div>
  <div class="restaurant__menu">
    <h3>Menu Makanan</h3>
    <ul>
      ${restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}
    </ul>
    <br/>
    <h3>Menu Minuman</h3>
    <ul>
      ${restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
    </ul>
  </div>
  <div class="restaurant__reviews">
    <h3>Customer Reviews</h3>
    <ul>
      ${restaurant.customerReviews.map((review) => `<li>${review.name}: ${review.review} (${review.date})</li>`).join('')}
    </ul>
    <div class="restaurant__add-review">
      <h3>Add Review</h3>
      <form id="addReviewForm">
        <label for="reviewName">Name:</label>
        <input type="text" id="reviewName" name="reviewName">
        <label for="reviewContent">Review:</label>
        <textarea id="reviewContent" name="reviewContent" rows="4" cols="50"></textarea><br>
        <button disabled>Submit Review</button>
      </form>
    </div>
  </div>
`;

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <div class="restaurant-item__header">
      <img class="lazyload restaurant-item__header__poster" alt="${restaurant.name || '-'}"
           data-src="${
  restaurant.pictureId
    ? `${CONFIG.BASE_IMAGE_RESTO}small/${restaurant.pictureId}`
    : 'https://picsum.photos/id/666/800/450?grayscale'
}"  crossorigin="anonymous">
      <div class="restaurant-item__header__rating">
        <p>⭐️<span class="restaurant-item__header__rating__score">${
  restaurant.rating || '-'
}</span></p>
      </div>
    </div>
    <div class="restaurant-item__content">
      <h3 class="restaurant__name"><a href="/#/detail/${restaurant.id}">${restaurant.name || '-'}</a></h3>
      <p>${restaurant.description || '-'}</p>
    </div>
  </div>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantDetailTemplate,
  createRestaurantItemTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
};
