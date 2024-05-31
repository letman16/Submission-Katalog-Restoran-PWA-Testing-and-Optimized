import API_ENDPOINT from '../globals/api-endpoint';

class HungerDB {
  static async showResto() {
    const response = await fetch(API_ENDPOINT.SHOW_RESTO);
    const responseJson = await response.json();
    return responseJson;
  }

  static async favoriteResto() {
    // const response = await fetch(API_ENDPOINT.UPCOMING);
    // const responseJson = await response.json();
    // return responseJson.results;
  }

  static async detailResto(id) {
    const response = await fetch(API_ENDPOINT.DETAIL_RESTO(id));
    return response.json();
  }
}

export default HungerDB;
