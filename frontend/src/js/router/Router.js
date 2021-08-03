import { useStorage } from '../utils/local-storage';
import { transitionView } from '../utils/transition';
import { checkRouterPath, setPathToCategory } from '../utils/utils';
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
   const link = document.getElementById('shopping-link');
   const info = document.querySelector('[data-circle]');
   const category = history.state.category;
   const isEmpty = useStorage.checkIsEmpty(category);

   link.setAttribute('href', `/${category}/shopping-cart`);

   if (!isEmpty) {
      link.style.color = `var(--color-${colors[category]})`;
      info.classList.add('scale');
      info.classList.remove('unscale');
   } else {
      link.style.color = 'var(--color-text)';
      info.classList.add('unscale');
      info.classList.remove('scale');
   }
}

const navigate = (event) => {
   /**@type {HTMLAnchorElement} */
   const target = event.target;
   event.preventDefault();

   const href = target.getAttribute('href');
   const category = setPathToCategory(event.target.pathname);

   if (location.href === target.href) return;

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

async function renderView() {
   const app = document.getElementById('app');
   const path = window.location.pathname;
   const href = window.location.href;

   const { render, set, title } = ROUTES.find((route) => {
      return route.path === checkRouterPath(path, href);
   });

   app.innerHTML = await render();
   if (set) set();
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
