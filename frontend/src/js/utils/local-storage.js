/**
 *
 * @param {string} category
 * @returns
 */
function getProductFromCategory(category) {
   return JSON.parse(localStorage.getItem(category)) || [];
}

/**
 *
 * @param {string} category
 * @param {object} items
 */
function addItem({ category, name, quantity, price, id, option }) {
   const items = getProductFromCategory(category);
   const item = items.find((cat) => cat.name === name);

   if (item) {
      item.quantity += quantity;

      const optionItem = item.options.find((i) => i.name === option.name);

      optionItem
         ? (optionItem.quantity += quantity)
         : item.options.push(option);
   } else {
      items.push({
         name,
         price,
         quantity,
         id,
         options: [{ ...option }],
      });
   }
   localStorage.setItem(category, JSON.stringify(items));
}

function removeItem(key, quantity) {
   const items = getProductFromCategory(key);
   const item = items.find((i) => i.name === key);

   if (!item) {
      return;
   } else {
      item.quantity -= quantity;
   }

   if (item.quantity <= 0) {
      item.quantity = 0;
      localStorage.removeItem(key);
   } else {
      localStorage.setItem(key, JSON.stringify(items));
   }
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
