/**
 * @typedef {object} Product
 * @property {number} quantity
 * @property {string} category
 * @property {string} name
 * @property {string} [price]
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
 * @param {string} category
 * @returns
 */
function checkIsEmpty(category) {
   let isEmpty;
   const products = getProductFromCategory(category);

   if (category === 'all') {
      const storage = Object.entries(localStorage).filter(
         ([k, v]) => k !== 'mode'
      );

      if (storage.every(([k, v]) => v === '[]') || !storage.length)
         isEmpty = true;
      else isEmpty = false;

      return isEmpty;
   }

   if (!products.length) isEmpty = true;
   else isEmpty = false;

   return isEmpty;
}

/**
 *
 * @param {Product} product
 *
 */
function addItem(product) {
   const { category, name, quantity, option } = product;
   let isMax;

   const items = getProductFromCategory(category);
   const item = items.find((i) => i.name === name && i.option === option);

   if (!item) items.push(product);

   if (item && item.quantity <= 10) {
      item.quantity += quantity;
      isMax = false;
   }

   if (item && item.quantity > 10) {
      item.quantity = 10;
      isMax = true;
   }

   localStorage.setItem(category, JSON.stringify(items));
   return isMax;
}

function updateItem(product) {
   const { category, name, quantity, option } = product;

   const items = getProductFromCategory(category);
   const item = items.find((i) => i.name === name && i.option === option);

   item.quantity = quantity;

   localStorage.setItem(category, JSON.stringify(items));
}

/**
 *
 * @param {Product} product
 *
 */
function removeItem(product) {
   const { category, name, option } = product;
   const items = getProductFromCategory(category);

   const item = items.find((i) => i.name === name && i.option === option);

   const cleanedItems = items.filter(
      (i) => i.name != item.name || i.option != item.option
   );

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
   updateItem,
   removeItem,
   getProductFromCategory,
   cleanCategory,
   checkIsEmpty,
};
