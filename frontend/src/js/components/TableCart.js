import { triggerEvent } from '../utils/event';
import { useStorage } from '../utils/local-storage';
import {
   formatPrice,
   getTableTotalPrice,
   parseStringToNumber,
} from '../utils/utils';

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
 * @param {number} quantity
 * @returns
 */
const Select = (quantity) => {
   return /* html */ `
      <select data-cart="select" >
         ${Array.from({ length: 10 }, (_, k) => {
            const selected = quantity === k + 1 ? 'selected' : '';
            return /*html */ `
               <option ${selected} value="${k + 1}" >
                  ${k + 1}
               </option>
            `;
         }).join('')}
      </select>
   `;
};

const Trash = () => /* html */ `
      <button data-cart="remove">
         <svg
            class="svg-icon"
            focusable="false"
            role="img"
            aria-hidden="true"
         >
            <use href="#trash-icon" />
         </svg>
      </button>   
`;

const TH = ['Name', 'Option', 'Price', 'Quantity', 'Subtotal', 'Remove'];

/**
 *
 * @param {Product[]} datas
 */
const Rows = (datas) => {
   return datas
      .map((data) => {
         const { quantity, price, id, name, option, category } = data;

         const totalRow = quantity * Number(price);
         const href = `/${category}?id=${id}`;

         const select = Select(quantity);
         const removeBtn = Trash();

         const ROW = [
            { span: 'Options', content: option },
            { span: 'Price', content: formatPrice(price) },
            { span: 'Quantity', content: select },
            { span: 'Subtotal', content: formatPrice(totalRow) },
            { span: 'Remove', content: removeBtn },
         ];

         return /* html */ `
            <tr data-category="${category}" data-id="${id}" data-name="${name}" data-option="${option}" data-quantity="${quantity}" >
               <th><a href="${href}" data-router >${name}</a></th>
               ${ROW.map(
                  (row) => /* html */ `
                  <td><span>${row.span}: </span>${row.content}</td>
               `
               ).join('')}
            </tr>
         `;
      })
      .join('');
};

async function render(category, datas) {
   const totalTable = getTableTotalPrice(datas);
   const rows = Rows(datas);

   if (!datas.length) return;

   return /*html */ `
      <table>
         <caption>
            <a data-router href="/${category}/shopping-cart">${category}</a>
         </caption>
         <thead>
            <tr>
               ${TH.map(
                  (title) => /*html */ `
                     <th scope="col" >${title}</th>
                  `
               ).join('')}
            </tr>
         </thead>
         <tbody>
            ${rows}
         </tbody>
         <tfoot>
            <tr>
               <td>Total: <b>${formatPrice(totalTable)}</b></td>
            </tr>
         </tfoot>
      </table>
   `;
}

function set() {
   const rows = document.querySelectorAll('tr[data-id]');

   for (const row of rows) {
      row.addEventListener('change', (event) => {
         if (event.target.matches('[data-cart="select"]')) {
            const select = event.target;

            const datas = {
               category: row.dataset.category,
               id: row.dataset.id,
               name: row.dataset.name,
               option: row.dataset.option,
               quantity: parseStringToNumber(select.value),
            };

            useStorage.updateItem(datas);
            triggerEvent('update');
         }
      });

      row.addEventListener('click', (event) => {
         if (event.target.matches('[data-cart="remove"]')) {
            const datas = {
               category: row.dataset.category,
               id: row.dataset.id,
               name: row.dataset.name,
               option: row.dataset.option,
            };

            useStorage.removeItem(datas);
            triggerEvent('update');
         }
      });
   }
}

export const TableCart = {
   render,
   set,
};
