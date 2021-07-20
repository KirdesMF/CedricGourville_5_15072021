import { parseStringToNumber } from './utils';
// TODO refactor

/**
 * Local storage method
 *
 *
 */
export const useLocalStorage = {
   getAllItems: function () {
      let storage = {};

      for (let [key, value] of Object.entries(window.localStorage)) {
         storage[key] = JSON.parse(value);
      }

      return storage || {};
   },

   getTotalItems: function () {
      const allItems = this.getAllItems();
   },

   /**
    * @description clear all local storage
    *
    */
   clearAll: () => localStorage.clear(),

   /**
    *
    * @param {string} key
    * @returns
    *
    */
   getItem: function (key) {
      return JSON.parse(localStorage.getItem(key)) || [];
   },

   /**
    *
    * @param {Object.<string, string>}
    *
    */
   addItem: function ({ name, quantity, price, id, category, option }) {
      const items = this.getItem(name);
      const item = items.find((i) => i.name === name);

      if (item) {
         item.quantity =
            parseStringToNumber(item.quantity) + parseStringToNumber(quantity);

         const optionItem = item.options.find((i) => i.name === option.name);

         if (optionItem) {
            optionItem.quantity =
               parseStringToNumber(optionItem.quantity) +
               parseStringToNumber(quantity);
         } else {
            item.options.push(option);
         }
      } else {
         items.push({
            name,
            price,
            quantity,
            id,
            category,
            options: [{ ...option }],
         });
      }

      localStorage.setItem(name, JSON.stringify(items));
   },

   /**
    *
    * @param {string} name
    * @param {string} quantity
    * @returns
    */
   removeItem: function (name, quantity) {
      const items = this.getItem(name);
      const item = items.find((i) => i.name === name);

      if (!item) {
         return;
      } else {
         item.quantity =
            parseStringToNumber(item.quantity) - parseStringToNumber(quantity);
      }

      if (item.quantity <= 0) {
         item.quantity = 0;
         localStorage.removeItem(name);
      } else {
         localStorage.setItem(name, JSON.stringify(items));
      }
   },
};
