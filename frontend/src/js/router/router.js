import { Category } from '../views/Category';
import { Error404 } from '../views/Error404';
import { Home } from '../views/Home';
import { Product } from '../views/Product';
import { ShoppingCart } from '../views/ShoppingCart';
import { Success } from '../views/Success';

function setDocumentTitle(title) {
   document.title = title;
}

function updateLinkShoppingCart() {
   const link = document.querySelector('#shopping-link');

   const path = window.location.pathname;
   const category = history.state?.category ?? 'all';

   if (path === '/') link.setAttribute('href', `/all/shopping-cart`);
   else link.setAttribute('href', `/${category}/shopping-cart`);
}

const handleAnchor = (event) => {
   event.preventDefault();

   const path = window.location.pathname;
   const href = event.target.getAttribute('href');
   const category = event.target.pathname.split('/')[1];

   if (path === href) return;

   window.history.pushState({ category: category }, '', href);
   renderView();
};

export function setLinkRouter() {
   const anchors = document.querySelectorAll(`[data-router]`);
   anchors.forEach((anchor) => {
      if (anchor.hasAttribute('data-event')) {
         return;
      } else {
         anchor.addEventListener('click', handleAnchor);
         anchor.setAttribute('data-event', 'true');
      }
   });
}

const routes = [
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

async function renderView() {
   const app = document.getElementById('app');
   const path = window.location.pathname;
   const href = window.location.href;

   // check the path
   const { component, title } = routes.find((route) => {
      // product comp
      if (href.includes('?id=')) {
         return route.path === '/product';
      }
      if (path.includes('/shopping-cart')) {
         return route.path === '/shopping-cart';
      }

      if (path.includes('/success')) {
         return route.path === '/success';
      }

      return route.path === path || route.path === '/error';
   });

   app.innerHTML = await component.render();
   if ('set' in component) {
      component.set();
   }

   setDocumentTitle(title);
   setLinkRouter();
   updateLinkShoppingCart();
}

['popstate', 'load'].forEach((event) =>
   window.addEventListener(event, renderView)
);
