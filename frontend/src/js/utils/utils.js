/**
 *
 * @param {string} price
 * @returns string
 * @description transform string to a string in Euro
 */
export function formatPrice(price) {
   const number = price / 100; // change string to number
   return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
   }).format(number);
}

const options = {
   teddies: 'colors',
   cameras: 'lenses',
   furniture: 'varnish',
};

/**
 *
 * @param {keyof options} category
 * @returns string
 * @description used to get the options array
 */
export function getOptionsFromDatas(category) {
   return options[category];
}

/**
 *
 * @param {string} text
 *
 */
export function parseStringToNumber(text) {
   return parseInt(text, 10);
}

/**
 *
 * @param {string} pathname
 */
export function setPathToCategory(pathname) {
   if (pathname === '/') return 'all';
   return pathname.split('/')[1];
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
 * @returns
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
