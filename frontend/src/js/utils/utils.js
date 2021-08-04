const OPTIONS = {
   teddies: 'colors',
   cameras: 'lenses',
   furniture: 'varnish',
};

/**
 *
 * @param {string} price
 * @returns string
 * @description transform string to a string in Euro
 */
export function formatPrice(price) {
   const number = Number(price) / 100; // change string to number
   return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
   }).format(number);
}

/**
 *
 * @param {keyof options} category
 * @returns string
 * @description used to get the options array
 */
export function getOptions(category) {
   return OPTIONS[category];
}

/**
 *
 * @param {string} text
 *
 */
export function parseStringToNumber(text) {
   return parseFloat(text, 10);
}

/**
 * @typedef {object} Product
 * @property {number} quantity
 * @property {string} category
 * @property {string} name
 * @property {string} price
 * @property {string} id
 * @property {string} option
 **/

/**
 *
 * @param {Product[]} datas
 *
 */
export function getTableTotalPrice(datas) {
   return datas
      .map((d) => d.quantity * Number(d.price))
      .reduce((a, b) => a + b, 0);
}

/**
 *
 * @param {number} quantity
 * @param {string} price
 * @returns number
 */
export function getRowTotalPrice(quantity, price) {
   return quantity * parseStringToNumber(price);
}

const CATEGORIES = ['all', 'teddies', 'cameras', 'furniture'];
const ANNEXS = ['product', 'shopping-cart', 'success'];

/**
 *
 * @param {string} pathname
 * @description use to grab the location pathname and return a category from it
 */
export function setPathToCategory(pathname) {
   const path = pathname.split('/')[1];
   const homePath = path === '' ? 'all' : path;
   const category = CATEGORIES.find((element) => element === homePath);

   if (category) return category;
}

/**
 *
 * @param {string} pathname
 * @param {string} href
 * @returns
 */
export function checkRouterPath(pathname, href) {
   const url = pathname.split('/');
   const isProduct = new URL(href).searchParams.has('id');
   const isCategory = CATEGORIES.some((cat) => cat === url[1]);

   if (isCategory && url[2]) {
      const annex = ANNEXS.find((element) => element === url[2]);
      if (annex) return `/${annex}`;
   }

   if (isCategory && isProduct) return '/product';
   if ((isCategory && url.length === 2) || pathname === '/') return pathname;

   return '/error';
}
