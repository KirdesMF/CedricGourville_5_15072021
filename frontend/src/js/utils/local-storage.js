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
 * @description use to know if localstorage is empty
 *
 */
function checkIsEmpty() {
   const values = Object.entries(localStorage).filter(([k, v]) => k !== 'mode');
   return values.every(([k, v]) => v === '[]') || !values.length;
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
function addItem({ category, name, quantity, option, price }) {
   let isMax;

   const products = getProductFromCategory(category);
   const product = products.find((i) => i.name === name && i.option === option);

   if (!product) products.push({ category, name, quantity, option, price });

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
