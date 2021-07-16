import { Article } from '../views/Article';
import { Home } from '../views/Home';

const routes = [
   { path: '/', component: Home },
   { path: '/teddies', component: Article },
   { path: '/cameras', component: Article },
   { path: '/furnitures', component: Article },
];

function handleAnchorNav() {
   const anchors = document.querySelectorAll('.nav > a');
   const routerEvent = new Event('router');

   anchors.forEach((anchor) =>
      anchor.addEventListener('click', (e) => {
         e.preventDefault();
         window.history.pushState({}, '', anchor.href.toLowerCase());
         window.dispatchEvent(routerEvent);
      })
   );
}

function startRouter() {
   const app = document.getElementById('app');
   const path = window.location.pathname.toLowerCase();
   const { component } = routes.find((route) => route.path === path);
   app.innerHTML = component.render();
}

function init() {
   handleAnchorNav();
   startRouter();
}

window.addEventListener('load', init);
window.addEventListener('router', startRouter);
