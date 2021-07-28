import { formatPrice } from '../utils/utils';

export function TableCart(datas) {
   const category = window.history.state.category;
   console.log(datas);

   return /*html */ `
      <table>
         <thead>
            <tr>
               <th colspan="5">Shopping Cart ${category}</th>
            </tr>
         </thead>
         <tbody>
            ${datas
               .map((data) => {
                  const { quantity, price, id, name } = data;
                  const totalPrice = quantity * Number(price);

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
               })
               .join('')}
         </tbody>
         <tfoot>
            <tr>
               <th colspan="4">Total</th>
               <td>21,000</td>
            </tr>
         </tfoot>
      </table>
   `;
}
