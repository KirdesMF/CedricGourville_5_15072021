import { getLastPathname } from '../utils/pathname';
import { Article } from '../views/Article';
import { Error404 } from '../views/Error404';
import { Home } from '../views/Home';
import { Product } from '../views/Product';
import { ShoppingCart } from '../views/ShoppingCart';

const routes = [
   { path: '/', component: Home },
   { path: '/teddies', component: Article },
   { path: '/cameras', component: Article },
   { path: '/furniture', component: Article },
   { path: '/product', component: Product },
   { path: '/shopping-cart', component: ShoppingCart },
   { path: '/error', component: Error404 },
];

async function renderView() {
   const app = document.getElementById('app');
   // const path = window.location.pathname;
   const path = getLastPathname(window.location.pathname);
   const href = window.location.href;

   // check the path
   const { component } = routes.find((route) => {
      // product comp
      if (href.includes('?id=')) {
         return route.path === '/product';
      }
      return route.path === path || route.path === '/error';
   });

   // render component
   app.innerHTML = await component.render();
   if ('set' in component) {
      component.set();
   }
   setLinkRouter();
}

function setLinkRouter() {
   const anchors = document.querySelectorAll(`[data-router="true"]`);
   const path = window.location.pathname;

   const handleAnchor = (event) => {
      e.preventDefault();

      // dont render it if comp already here
      if (path === anchor.href) {
         return;
      } else {
         // change URL
         window.history.pushState({}, '', anchor.href.toLowerCase());

         // render
         renderView();
      }
   };

   anchors.forEach((anchor) => {
      // check if anchor has already the event
      if (!anchor.hasAttribute('data-event')) {
         anchor.addEventListener('click', handleAnchor);
         anchor.setAttribute('data-event', 'true');
      }
   });
}

['popstate', 'load'].forEach((event) =>
   window.addEventListener(event, renderView)
);
