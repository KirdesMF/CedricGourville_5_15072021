import { formatPrice } from '../utils/utils';

export function TableCart({ name, id, option, quantity, price }) {
   const totalPrice = quantity * Number(price);
   return /* html */ `
      <tr>
         <td>${name}</td>
         <td>${id}</td>
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
