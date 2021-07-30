import { useStorage } from '../utils/local-storage';
import { formatPrice } from '../utils/utils';
/**
 * @typedef {object} Product
 * @property {number} quantity
 * @property {string} category
 * @property {string} name
 * @property {string} price
 * @property {string} id
 * @property {string} option
 **/

export const TableCart = {
   /**
    *
    * @param {Product[] | []} datas
    * @param {string} category
    * @returns
    */
   render: async (category, datas) => {
      const total = datas
         .map((d) => d.quantity * Number(d.price))
         .reduce((a, b) => a + b, 0);

      const rows = datas
         .map((data) => {
            const { quantity, price, id, name, option } = data;
            const totalPrice = quantity * Number(price);
            const href = `/${category}?id=${id}`;

            return /* html */ `
               <tr data-id="${id}"  data-name="${name}" data-option="${option}" data-quantity="${quantity}" >
                  <td>
                     <a href="${href}" data-router >${name}</a>
                  </td>
                  <td>${option}</td>
                  <td>${quantity}</td>
                  <td>${formatPrice(price)}</td>
                  <td>
                     <button data-cart="add" > + </button>
                     <button data-cart="remove" > - </button>
                  </td>
                  <td>${formatPrice(totalPrice)}</td>
               </tr>
            `;
         })
         .join('');

      if (!datas.length) return;

      return /*html */ `
         <table>
            <thead>
               <tr>
                  <th colspan="5">Shopping Cart ${category}</th>
               </tr>
            </thead>
            <tbody>
               ${rows}
            </tbody>
            <tfoot>
               <tr>
                  <th colspan="4">Total</th>
                  <td>${formatPrice(total)}</td>
               </tr>
            </tfoot>
         </table>
      `;
   },
   /**
    *
    * @param {Product[] | []} datas
    * @param {string} category
    * @returns
    */
   set: () => {},
};
