import { postCommand } from '../utils/fetch';
import { useStorage } from '../utils/local-storage';

export const FormCart = {
   render: async () => {
      return /*html */ `
         <form action="" method="POST"  class="grid-flow form-cart" >
            <div>
               <label>First Name</label>
               <input type="text" name="firstName" id="firstName" required />
            </div>
   
            <div>
               <label>Last Name</label>
               <input type="text" name="lastName" id="lastName" required />
            </div>
   
            <div>
               <label>Address</label>
               <input type="text" name="address" id="address" required />
            </div>
   
            <div>
               <label>City</label>
               <input type="text" name="city" id="city" required />
            </div>
   
            <div>
               <label>Zip Code : </label>
               <input type="text" name="city" id="city" pattern="[0-9]*" required />
            </div>
   
            <div>
               <label>Email</label>
               <input type="email" name="email" id="email" required />
            </div>
   
            <input type="submit" value="Send">
         </form>
      `;
   },
   set: () => {
      const form = document.querySelector('form');
      const category = window.history.state.category;
      const datas = useStorage.getCategory(category);
      const products = datas.map((d) => d.id);

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

         postCommand(category, order);
      });
   },
};
