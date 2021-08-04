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
   const item = localStorage.getItem(category);
   return item ? JSON.parse(item) : [];
}

/**
 *
 * @description use to know if localstorage is empty
 *
 */
function checkIsEmpty() {
   const values = Object.entries(localStorage).filter(([k, _]) => k !== 'mode');
   const isEmpty = values.every(([_, v]) => v === '[]') || !values.length;

   return isEmpty;
}

/**
 *
 * @param {string} category
 * @returns
 */
function checkIsCategoryEmpty(category) {
   let isEmpty;
   const products = getProductFromCategory(category);

   if (category === 'all') {
      checkIsEmpty() ? (isEmpty = true) : (isEmpty = false);
      return isEmpty;
   }

   !products.length ? (isEmpty = true) : (isEmpty = false);
   return isEmpty;
}

/**
 *
 * @description get all keys of localstorage
 *
 */
function getAllKeys() {
   const keys = Object.keys(localStorage).filter((k) => k !== 'mode');
   return keys;
}

/**
 *
 * @param {Product} product
 *
 */
function addItem({ category, name, quantity, option, price, id }) {
   let isMax;

   const products = getProductFromCategory(category);
   const product = products.find((i) => i.name === name && i.option === option);

   if (!product) {
      products.push({ category, name, quantity, option, price, id });
      if (quantity <= 10) {
         quantity += quantity;
         isMax = false;
      }

      if (quantity > 10) {
         quantity = 10;
         isMax = true;
      }
   }

   if (product && product.quantity <= 10) {
      product.quantity += quantity;
      isMax = false;
   }

   if (product && product.quantity > 10) {
      product.quantity = 10;
      isMax = true;
   }

   localStorage.setItem(category, JSON.stringify(products));
   return isMax;
}

/**
 *
 * @param {Product} product
 */
function updateItem({ category, name, quantity, option }) {
   const products = getProductFromCategory(category);
   const product = products.find((i) => i.name === name && i.option === option);

   product.quantity = quantity;
   localStorage.setItem(category, JSON.stringify(products));
}

/**
 *
 * @param {Product} product
 *
 */
function removeItem({ category, name, option }) {
   const products = getProductFromCategory(category);
   const product = products.find((i) => i.name === name && i.option === option);

   const removed = products.filter(
      (i) => i.name != product.name || i.option != product.option
   );

   localStorage.setItem(category, JSON.stringify(removed));
}

/**
 * @description clear the local storage
 */
function clear() {
   localStorage.clear();
}

/**
 *
 * @param {string} category
 */
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
   checkIsCategoryEmpty,
   getAllKeys,
};
