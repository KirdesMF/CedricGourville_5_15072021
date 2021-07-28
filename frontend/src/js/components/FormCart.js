import { postCommand } from '../utils/fetch';

export async function FormCart() {
   const category = window.history.state.category;
   console.log(category);

   await postCommand(category);

   return /*html */ `
      <form action=""  class="grid-flow" >
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
            <label>Email</label>
            <input type="email" name="email" id="email" required />
         </div>

         <input type="submit" value="Send">
      </form>
   `;
}
