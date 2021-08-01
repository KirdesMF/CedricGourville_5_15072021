import { useStorage } from '../utils/local-storage';
import { parseStringToNumber, setPathToCategory } from '../utils/utils';
import { Category } from '../views/Category';
import { Error404 } from '../views/Error404';
import { Home } from '../views/Home';
import { Product } from '../views/Product';
import { ShoppingCart } from '../views/ShoppingCart';
import { Success } from '../views/Success';

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

const colors = {
   all: 'info',
   teddies: 'primary',
   cameras: 'ternary',
   furniture: 'secondary',
};

function updateLinkShoppingCart() {
   const link = document.querySelector('#shopping-link');
   const info = document.querySelector('[data-circle]');
   const category = history.state.category;
   const isEmpty = useStorage.checkIsEmpty(category);

   link.setAttribute('href', `/${category}/shopping-cart`);

   if (!isEmpty) {
      link.style.color = `var(--color-${colors[category]})`;
      info.style.transform = `scale(1)`;
   } else {
      link.style.color = 'var(--color-text)';
      info.style.transform = `scale(0)`;
   }
}

async function setHistoryCategory() {
   const path = window.location.pathname;
   const category = setPathToCategory(path);

   window.history.pushState({ category: category }, '');
}

//TODO improve how to handle transition
/**
 *
 * @param {() => void} onFinish
 */
function transitionView(onFinish) {
   const app = document.getElementById('app');

   const transition = getComputedStyle(app).getPropertyValue('--transition');

   const add = () => app.classList.add('transition');
   const remove = () => app.classList.remove('transition');

   add();

   setTimeout(() => {
      onFinish();
      remove();
   }, parseStringToNumber(transition));
}

const navigate = (event) => {
   event.preventDefault();

   const href = event.target.getAttribute('href');
   const category = setPathToCategory(event.target.pathname);

   if (location.href === event.target.href) return;

   transitionView(() => {
      window.history.pushState({ category: category }, '', href);
      rerender();
   });
};

function setLinkRouter() {
   const anchors = document.querySelectorAll(`[data-router]`);

   anchors.forEach((anchor) => {
      const hasEvent = anchor.hasAttribute('data-event');

      if (hasEvent) return;

      anchor.addEventListener('click', navigate);
      anchor.setAttribute('data-event', 'true');
   });
}

//TODO improve render view check string
async function renderView() {
   const app = document.getElementById('app');
   const path = window.location.pathname;
   const href = window.location.href;

   const { component, title } = routes.find((route) => {
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
   if ('set' in component) component.set();
   document.title = title;
}

async function init() {
   await setHistoryCategory();
   await renderView();
   setLinkRouter();
   updateLinkShoppingCart();
}

async function rerender() {
   await renderView();
   setLinkRouter();
   updateLinkShoppingCart();
}

['popstate', 'update'].forEach((event) =>
   window.addEventListener(event, rerender)
);

window.addEventListener('menu', setLinkRouter);
window.addEventListener('load', init);
window.addEventListener('shopping', updateLinkShoppingCart);
