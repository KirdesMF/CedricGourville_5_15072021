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
 * @param {keyof options} path
 * @returns string
 * @description used to get the options array
 */
export function getOptionsFromDatas(path) {
   return options[path];
}

/**
 *
 * @param {string} text
 *
 */
export function parseStringToNumber(text) {
   return parseInt(text, 10);
}

export const useLocalStorage = {
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
   addItem: function ({ name, quantity, price, id, category }) {
      const items = this.getItem(name);
      const item = items.find((i) => i.name === name);

      if (item) {
         item.quantity =
            parseStringToNumber(item.quantity) + parseStringToNumber(quantity);
      } else {
         items.push({
            name,
            price,
            quantity,
            id,
            category,
         });
      }

      localStorage.setItem(name, JSON.stringify(items));
      console.log(items);
   },

   /**
    *
    * @param {string} name
    * @param {string | number} quantity
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

      console.log(localStorage);
   },
};
