import { formatPrice } from '../utils/utils';

export function TableCart({ name, id, option, quantity, price }) {
   const totalPrice = quantity * Number(price);
   const category = window.history.state.category;
   return /* html */ `
      <tr>
         <td>
            <a href="/${category}?id=${id}" data-router="true">${name}</a>
         </td>
         <td>${quantity}</td>
         <td>${formatPrice(price)}</td>
         <td>
            <button> + </button>
            <button> - </button>
         </td>
         <td>${formatPrice(totalPrice)}</td>
      </tr>
   `;
}
