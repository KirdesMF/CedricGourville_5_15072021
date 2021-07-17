import { Article } from '../views/Article';
import { Home } from '../views/Home';
import { Product } from '../views/Product';

const routes = [
   { path: '/', component: Home },
   { path: '/teddies', component: Article },
   { path: '/cameras', component: Article },
   { path: '/furniture', component: Article },
   { path: '/product', component: Product },
];

function setLinkRouter() {
   const anchors = document.querySelectorAll(`[data-router="true"]`);
   const routerEvent = new Event('router');

   anchors.forEach((anchor) =>
      anchor.addEventListener('click', (e) => {
         e.preventDefault();
         window.history.pushState({}, '', anchor.href.toLowerCase());
         window.dispatchEvent(routerEvent);
      })
   );
}

async function startRouter() {
   const app = document.getElementById('app');
   const path = window.location.pathname.toLowerCase();
   const { component } = routes.find(
      (route) => route.path === path || route.path.includes('/product')
   );
   app.innerHTML = await component.render();
   setLinkRouter();
}

window.addEventListener('load', startRouter);
window.addEventListener('router', startRouter);
