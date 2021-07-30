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
 * @param {string} category
 * @returns {([] | Product[])}
 */
function getProductFromCategory(category) {
   return JSON.parse(localStorage.getItem(category)) || [];
}

/**
 *
 * @param {Product} product
 *
 */
function addItem(product) {
   const { category, name, quantity, option } = product;

   const items = getProductFromCategory(category);
   const item = items.find((i) => i.name === name && i.option === option);

   if (!item) items.push(product);

   if (item && item.quantity < 10) {
      item.quantity += quantity;
   }

   if (item && item.quantity >= 10) {
      item.quantity = 10;
      alert('10 max bro');
   }

   localStorage.setItem(category, JSON.stringify(items));
}

/**
 *
 * @param {Product} product
 *
 */
function removeItem(product) {
   const { category, name, quantity, option } = product;
   const items = getProductFromCategory(category);
   const item = items.find((i) => i.name === name && i.option === option);
   const cleanedItems = items.filter((i) => i.quantity !== 0);

   if (!item) return;

   if (item) item.quantity -= quantity;

   if (item.quantity <= 0) {
      item.quantity = 0;
   }

   localStorage.setItem(category, JSON.stringify(cleanedItems));
}

function clear() {
   localStorage.clear();
}

function cleanCategory(category) {
   localStorage.removeItem(category);
}

export const useStorage = {
   clear,
   addItem,
   removeItem,
   getProductFromCategory,
   cleanCategory,
};
