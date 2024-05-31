/* eslint-disable no-undef */
import FavoriteHungerAppsIdb from '../src/scripts/data/favorite-hungerapp-idb';
import * as TestFactories from './helpers/testFactories';

describe('Liking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    // Memastikan resto berhasil disukai
    const restaurant = await FavoriteHungerAppsIdb.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });

    await FavoriteHungerAppsIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant again when its already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    // Tambahkan restaurant dengan ID 1 ke daftar restaurant yang disukai
    await FavoriteHungerAppsIdb.putRestaurant({ id: 1 });
    // Simulasikan pengguna menekan tombol suka restaurant
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // Tidak ada restaurant yang ganda
    expect(await FavoriteHungerAppsIdb.getAllRestaurants()).toEqual([{ id: 1 }]);
    await FavoriteHungerAppsIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({});
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteHungerAppsIdb.getAllRestaurants()).toEqual([]);
  });
});
