/**
 *
 * @param {string} key
 * @returns
 */
function getItem(key) {
   return JSON.parse(localStorage.getItem(key)) || [];
}

function getAllCategory() {
   for (let [key, value] of Object.entries(localStorage)) {
      console.log(JSON.parse(value));
   }
}

/**
 *
 * @param {string} category
 * @param {object} items
 */
function addItem({ key, name, quantity, price, id, option }) {
   const category = getItem(key);
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
   const items = getItem(key);
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
   getItem,
   getAllCategory,
};
