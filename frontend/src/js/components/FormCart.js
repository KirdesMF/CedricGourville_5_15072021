import { postOrder } from '../utils/fetch';
import { useStorage } from '../utils/local-storage';

const INPUTS = [
   { type: 'text', id: 'firstName', label: 'First Name' },
   { type: 'text', id: 'lastName', label: 'Last Name' },
   { type: 'text', id: 'address', label: 'Address' },
   { type: 'text', id: 'city', label: 'City' },
   { type: 'text', id: 'zip', label: 'Zip Code' },
   { type: 'email', id: 'email', label: 'Email' },
];

export const FormCart = {
   render: async () => {
      return /*html */ `
         <form action="/success" method="POST"  class="grid-flow form-cart">
            ${INPUTS.map((input) => {
               return /*html */ `
                  <div>
                     <label for="${input.id}" >${input.label} *</label>
                     <input type="${input.type}" id="${input.id}" name="${input.id}" required />
                  </div>
               `;
            }).join('')}
            <input type="submit" value="Command">
         </form>
      `;
   },
   /**
    *
    * @param {Product[] | []} datas
    * @param {string} category
    * @returns
    */
   set: (category, datas) => {
      const form = document.querySelector('form');
      const products = datas.map((d) => d.id);
      const total = datas
         .map((d) => d.quantity * Number(d.price))
         .reduce((a, b) => a + b, 0);

      const inputs = document.querySelectorAll('form input');

      const firstName = document.getElementById('firstName');
      const lastName = document.getElementById('lastName');
      const email = document.getElementById('email');
      const city = document.getElementById('city');
      const address = document.getElementById('address');
      const zip = document.getElementById('zip');

      form.addEventListener('submit', (e) => {
         e.preventDefault();

         const order = {
            contact: {
               firstName: firstName.value,
               lastName: lastName.value,
               address: `${address.value} ${zip.value}`,
               city: city.value,
               email: email.value,
            },
            products: products,
         };

         postOrder(category, order);
         sessionStorage.setItem(`${category}-total`, total);
      });
   },
};
