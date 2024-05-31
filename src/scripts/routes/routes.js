import ShowResto from '../views/pages/show-resto';
import Favorite from '../views/pages/favorite';
import Detail from '../views/pages/detail';

const routes = {
  '/': ShowResto, // default page
  '/show-resto': ShowResto,
  '/detail/:id': Detail,
  '/favorite': Favorite,
};

export default routes;
