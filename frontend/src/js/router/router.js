import { Article } from '../views/Article';
import { Error404 } from '../views/Error404';
import { Home } from '../views/Home';
import { Product } from '../views/Product';
import { ShoppingCart } from '../views/ShoppingCart';

function setDocumentTitle(title) {
   document.title = title;
}

function updateLinkShoppingCart() {
   const link = document.querySelector('#shopping-link');

   const path = window.location.pathname;
   const category = history.state.category || '';

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

function setLinkRouter() {
   const anchors = document.querySelectorAll(`[data-router]`);
   anchors.forEach((anchor) => {
      if (anchor.hasAttribute('data-event')) {
         return;
      } else {
         anchor.addEventListener('click', handleAnchor);
         anchor.setAttribute('data-event', 'true');
      }
   });

   updateLinkShoppingCart();
}

const routes = [
   { path: '/', component: Home, title: 'Oricono - Home' },
   { path: '/teddies', component: Article, title: 'Oricono - Teddies' },
   { path: '/cameras', component: Article, title: 'Oricono - Cameras' },
   { path: '/furniture', component: Article, title: 'Oricono - Furniture' },
   { path: '/product', component: Product, title: 'Oricono - Product' },
   {
      path: '/shopping-cart',
      component: ShoppingCart,
      title: 'Oricono - Shopping Cart ',
   },
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
      return route.path === path || route.path === '/error';
   });

   app.innerHTML = await component.render();
   if ('set' in component) {
      component.set();
   }

   setDocumentTitle(title);
   setLinkRouter();
}

['popstate', 'load'].forEach((event) =>
   window.addEventListener(event, renderView)
);
