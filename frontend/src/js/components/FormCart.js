import { postOrder } from '../utils/fetch';
import { useStorage } from '../utils/local-storage';

const INPUTS = [
   {
      type: 'text',
      id: 'firstName',
      label: 'First Name',
      placeholder: 'Enter your first name',
   },
   {
      type: 'text',
      id: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter your last name',
   },
   {
      type: 'text',
      id: 'address',
      label: 'Address',
      placeholder: 'Fill in your address',
   },
   {
      type: 'text',
      id: 'city',
      label: 'City',
      placeholder: 'e.g. Paris',
   },
   {
      type: 'text',
      id: 'zip',
      label: 'Zip Code',
      placeholder: 'e.g. 75012, 10220...',
      pattern: '[0-9]{5}',
   },
   {
      type: 'email',
      id: 'email',
      label: 'Email',
      placeholder: 'e.g. contact@orinoco.fr',
   },
];

export const FormCart = {
   render: async () => {
      return /*html */ `
         <form>
            ${INPUTS.map((input) => {
               return /*html */ `
                  <div class="form-cart__input" data-grid="${input.id}">
                     <label for="${input.id}" >${
                  input.label
               } <span>*</span></label>
                     <input
                        placeholder="${input.placeholder}" 
                        type="${input.type}" 
                        id="${input.id}" 
                        name="${input.id}" 
                        ${input.pattern ? `pattern="${input.pattern}"` : ''}
                        required 
                     />
                  </div>
               `;
            }).join('')}
            <button id="btn-submit" type="submit">Order</button>
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

      const btn = document.getElementById('btn-submit');

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
