/**
 *
 * @param {number} price
 * @returns string
 * @description transform number to a string in Euro
 */
export function formatPrice(price) {
   return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
   }).format(price / 100);
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
