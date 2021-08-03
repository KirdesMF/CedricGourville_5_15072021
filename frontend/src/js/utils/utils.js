const CATEGORIES = ['teddies', 'cameras', 'furniture'];
const PATHS = ['/product', '/shopping-cart', '/success'];
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
export function getOptionsFromDatas(category) {
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
 *
 * @param {string} pathname
 */
export function setPathToCategory(pathname) {
   const category = pathname.split('/')[1];
   const isCategory = CATEGORIES.some((cat) => cat === category);

   if (!isCategory) return 'all';
   return category;
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

/**
 *
 * @param {object} route
 * @param {string} route.path
 * @param {() => void} route.render
 * @param {() => void} [route.set]
 * @param {string} route.title
 * @param {string} path
 * @param {string} href
 *
 * @returns
 */
export function checkRouterPath(path, href) {
   const isCategory = [...CATEGORIES, 'all'].some((cat) => href.includes(cat));
   const isAnnex = PATHS.some((p) => href.includes(p));
   const annexPath = PATHS.find((p) => href.includes(p));

   if (isCategory && isAnnex) return annexPath;
   if (isCategory || path === '/') return `/${path.split('/')[1]}`;

   return '/error';
}
