/* eslint-disable no-shadow */
/* eslint-disable no-new */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import { spyOn } from 'jest-mock';
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteHungerAppsIdb from '../src/scripts/data/favorite-hungerapp-idb';
import FavoriteRestaurantSearchView
  from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-view';
import FavoriteRestaurantShowPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-show-presenter';

/* eslint-disable no-undef */

describe('Searching restaurans', () => {
  let presenter;
  let favoriteRestaurants;
  let view;
  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };
  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };
  const constructPresenter = () => {
    favoriteRestaurants = {
      getAllRestaurants: jest.fn(),
      searchRestaurants: jest.fn(),
    };
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });
  // start
  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);
      searchRestaurants('restaurant a');
      expect(presenter.latestQuery).toEqual('restaurant a');
    });
    it('should ask the model to search for liked restaurants', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);
      searchRestaurants('restaurant a');
      expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith('restaurant a');
    });

    it('should show the restaurants found by Favorite restaurants', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item').length).toEqual(3);
        done();
      });
      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            { id: 111, title: 'restaurant abc' },
            { id: 222, title: 'ada juga restaurant abcde' },
            { id: 333, title: 'ini juga boleh restaurant a' },
          ];
        }
        return [];
      });
      searchRestaurants('restaurant a');
    });
    it('should show the name of the restaurants found by Favorite restaurants', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        const restaurantNames = document.querySelectorAll('.restaurant__name');
        expect(restaurantNames.item(0).textContent).toEqual('restaurant abc');
        expect(restaurantNames.item(1).textContent).toEqual('ada juga restaurant abcde');
        expect(restaurantNames.item(2).textContent).toEqual('ini juga boleh restaurant a');
        done();
      });
      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            { id: 111, name: 'restaurant abc' },
            { id: 222, name: 'ada juga restaurant abcde' },
            { id: 333, name: 'ini juga boleh restaurant a' },
          ];
        }
        return [];
      });
      searchRestaurants('restaurant a');
    });
    it('should show - when the restaurant returned does not contain a title', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        const restaurantNames = document.querySelectorAll('.restaurant__name');
        expect(restaurantNames.item(0).textContent)
          .toEqual('-');

        done();
      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'film a') {
          return [{ id: 444 }];
        }

        return [];
      });

      searchRestaurants('film a');
    });
  });

  // end

  it('should be able to capture the query typed by the user', () => {
    favoriteRestaurants.searchRestaurants.mockImplementation(() => []);
    searchRestaurants('restaurant a');

    expect(presenter.latestQuery).toEqual('restaurant a');
  });

  it('should ask the model to search for liked restaurants', () => {
    favoriteRestaurants.searchRestaurants.mockImplementation(() => []);
    searchRestaurants('restaurant a');
    expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith('restaurant a');
  });

  it('should show the restaurants found by Favorite Restaurants', (done) => {
    document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
      expect(document.querySelectorAll('.restaurant-item').length).toEqual(3);
      done();
    });

    favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
      if (query === 'restaurant a') {
        return [
          { id: 111, title: 'restaurant abc' },
          { id: 222, title: 'ada juga restaurant abcde' },
          { id: 333, title: 'ini juga boleh restaurant a' },
        ];
      }
      return [];
    });

    searchRestaurants('restaurant a');
  });

  it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
    document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
      const restaurantNames = document.querySelectorAll('.restaurant__name');
      expect(restaurantNames.item(0).textContent).toEqual('restaurant abc');
      expect(restaurantNames.item(1).textContent).toEqual('ada juga restaurant abcde');
      expect(restaurantNames.item(2).textContent).toEqual('ini juga boleh restaurant a');
      done();
    });

    favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
      if (query === 'restaurant a') {
        return [
          { id: 111, name: 'restaurant abc' },
          { id: 222, name: 'ada juga restaurant abcde' },
          { id: 333, name: 'ini juga boleh restaurant a' },
        ];
      }
      return [];
    });

    searchRestaurants('restaurant a');
  });

  //   start
  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);
      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });
    it('should show all favorite restaurant', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);
      searchRestaurants('    ');
      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled();
    });
  });
  //   end

  // start
  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
        done();
      });
      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);
      searchRestaurants('restaurant a');
    });
    it('should not show any restaurant', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item').length).toEqual(0);
        done();
      });
      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);
      searchRestaurants('restaurant a');
    });
  });
//   end
});
