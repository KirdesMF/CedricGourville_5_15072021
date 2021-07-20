import { Article } from '../views/Article';
import { Error404 } from '../views/Error404';
import { Home } from '../views/Home';
import { Product } from '../views/Product';
import { ShoppingCart } from '../views/ShoppingCart';

const routes = [
   { path: '/', component: Home },
   { path: '/shopping-cart', component: ShoppingCart },
   { path: '/teddies', component: Article },
   { path: '/cameras', component: Article },
   { path: '/furniture', component: Article },
   { path: '/product', component: Product },
   { path: '/error', component: Error404 },
];

function setLinkRouter() {
   const anchors = document.querySelectorAll(`[data-router="true"]`);
   const path = window.location.pathname;

   anchors.forEach((anchor) => {
      if (!anchor.hasAttribute('data-event')) {
         anchor.setAttribute('data-event', 'true');

         anchor.addEventListener('click', (e) => {
            e.preventDefault();

            if (path === e.target.pathname) {
               return;
            }

            window.history.pushState({ path }, path, anchor.href.toLowerCase());
            renderView();
         });
      }
   });
}

async function renderView() {
   const app = document.getElementById('app');
   const path = window.location.pathname.toLowerCase();
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

['popstate', 'load'].forEach((event) =>
   window.addEventListener(event, renderView)
);
