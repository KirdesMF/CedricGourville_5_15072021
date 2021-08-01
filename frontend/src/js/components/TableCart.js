import { useStorage } from '../utils/local-storage';
import { formatPrice, parseStringToNumber } from '../utils/utils';
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
            return `
               <option ${selected} value="${k + 1}" >
                  ${k + 1}
               </option>
            `;
         }).join('')}
      </select>
   `;
};

export const TableCart = {
   /**
    *
    * @param {Product[]} datas
    * @param {string} category
    * @returns
    */
   render: async (category, datas) => {
      const total = datas
         .map((d) => d.quantity * Number(d.price))
         .reduce((a, b) => a + b, 0);

      const rows = datas
         .map((data) => {
            const { quantity, price, id, name, option, category } = data;
            const totalPrice = quantity * Number(price);
            const href = `/${category}?id=${id}`;
            const select = Select(quantity);

            return /* html */ `
               
               <tr data-category="${category}" data-id="${id}" data-name="${name}" data-option="${option}" data-quantity="${quantity}" >
                  <th>
                     <a href="${href}" data-router >${name}</a>
                  </th>

                  <td>
                     <span>Option: </span> 
                     ${option}
                  </td>
                  
                  <td>
                     <span>Price: </span>
                     ${formatPrice(price)}
                  </td>

                  <td>
                     <span>Quantity: </span>
                     ${select}
                  </td>

                  <td>
                     <span>Subtotal: </span>
                     ${formatPrice(totalPrice)}
                  </td>

                  <td>
                     <span>Remove: </span>
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
                  </td>
               </tr>
            `;
         })
         .join('');

      if (!datas.length) return;

      return /*html */ `
         <table>
            <caption>
               <a data-router href="/${category}/shopping-cart">${category}</a>
            </caption>
            <thead>
               <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Option</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Subtotal</th>
                  <th scope="col">Remove</th>
               </tr>
            </thead>
            <tbody>
               ${rows}
            </tbody>
            <tfoot>
               <tr>
                  <td>
                     Total: 
                     <b>${formatPrice(total)}</b>
                  </td>
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
   set: () => {
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

               const customEvent = new Event('update');
               window.dispatchEvent(customEvent);
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

               const customEvent = new Event('update');
               window.dispatchEvent(customEvent);
            }
         });
      }
   },
};
