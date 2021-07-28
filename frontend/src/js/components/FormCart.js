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

      const order = {
         contact: {
            firstName: 'firstname',
            lastName: 'lastname',
            address: 'dsqs',
            city: 'city',
            email: 'email',
         },
         products: products,
      };

      form.addEventListener('submit', (e) => {
         e.preventDefault();
         postCommand(category, order);
      });
   },
};
