import { Category } from '../views/Category';
import { Error404 } from '../views/Error404';
import { Home } from '../views/Home';
import { Product } from '../views/Product';
import { ShoppingCart } from '../views/ShoppingCart';
import { Success } from '../views/Success';

export const ROUTES = [
   { path: '/', component: Home, title: 'Oricono - Home' },
   { path: '/teddies', component: Category, title: 'Oricono - Teddies' },
   { path: '/cameras', component: Category, title: 'Oricono - Cameras' },
   { path: '/furniture', component: Category, title: 'Oricono - Furniture' },
   { path: '/product', component: Product, title: 'Oricono - Product' },
   {
      path: '/shopping-cart',
      component: ShoppingCart,
      title: 'Oricono - Shopping Cart ',
   },
   { path: '/success', component: Success, title: 'Orinoco - Success' },
   { path: '/error', component: Error404, title: 'Orinoco - Error' },
];
