import { useStorage } from '../utils/local-storage';
import { transitionView } from '../utils/transition';
import { parseStringToNumber, setPathToCategory } from '../utils/utils';
import { ROUTES } from './routes';

async function setHistoryCategory() {
   const path = window.location.pathname;
   const category = setPathToCategory(path);

   window.history.pushState({ category: category }, '');
}

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

const navigate = (event) => {
   event.preventDefault();

   const href = event.target.getAttribute('href');
   const category = setPathToCategory(event.target.pathname);

   if (location.href === event.target.href) return;

   transitionView([{ opacity: 1 }, { opacity: 0 }], () => {
      window.history.pushState({ category: category }, '', href);
      rerender();
   });
};

/**
 * @description remove default of anchor tag to use js routing
 */
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

   const { component, title } = ROUTES.find((route) => {
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

   transitionView([{ opacity: 0 }, { opacity: 1 }]);
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

window.addEventListener('load', init);
window.addEventListener('menu', setLinkRouter);
window.addEventListener('shopping', updateLinkShoppingCart);
