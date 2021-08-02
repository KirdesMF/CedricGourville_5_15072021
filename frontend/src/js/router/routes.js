import { Category } from '../views/Category';
import { Error404 } from '../views/Error404';
import { Home } from '../views/Home';
import { Product } from '../views/Product';
import { ShoppingCart } from '../views/ShoppingCart';
import { Success } from '../views/Success';

export const ROUTES = [
   { path: '/', render: Home.render, title: 'Oricono - Home' },
   { path: '/teddies', render: Category.render, title: 'Oricono - Teddies' },
   { path: '/cameras', render: Category.render, title: 'Oricono - Cameras' },
   {
      path: '/furniture',
      render: Category.render,
      title: 'Oricono - Furniture',
   },
   {
      path: '/product',
      render: Product.render,
      title: 'Oricono - Product',
      set: Product.set,
   },
   {
      path: '/shopping-cart',
      render: ShoppingCart.render,
      set: ShoppingCart.set,
      title: 'Oricono - Shopping Cart ',
   },
   { path: '/success', render: Success.render, title: 'Orinoco - Success' },
   { path: '/error', render: Error404.render, title: 'Orinoco - Error' },
];
