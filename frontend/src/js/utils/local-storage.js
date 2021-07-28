/**
 *
 * @param {string} key
 * @returns
 */
function getCategory(key) {
   return JSON.parse(localStorage.getItem(key)) || [];
}

function getAllCategory() {
   return Object.entries(localStorage).reduce(
      (acc, [key, value]) => ({
         ...acc,
         [key]: JSON.parse(value),
      }),
      {}
   );
}

/**
 *
 * @param {string} category
 * @param {object} items
 */
function addItem({ key, name, quantity, price, id, option }) {
   const category = getCategory(key);
   const item = category.find((cat) => cat.name === name);

   if (item) {
      item.quantity += quantity;

      const optionItem = item.options.find((i) => i.name === option.name);

      optionItem
         ? (optionItem.quantity += quantity)
         : item.options.push(option);
   } else {
      category.push({
         name,
         price,
         quantity,
         id,
         options: [{ ...option }],
      });
   }
   localStorage.setItem(key, JSON.stringify(category));
}

function removeItem(key, quantity) {
   const items = getCategory(key);
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

export const useStorage = {
   clear,
   addItem,
   removeItem,
   getCategory,
   getAllCategory,
};
