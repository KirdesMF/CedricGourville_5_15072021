export const ShoppingCart = {
   render: () => {
      const category = history.state.category;
      return /* html */ `
         <section class="shopping-cart panel h100 grid-flow grid-center">
            <table>
               <thead>
                  <tr>
                     <th colspan="100">Shopping Cart ${category}</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>Produit</td>
                     <td>id</td>
                     <td>option</td>
                     <td>quantity</td>
                     <td>unique price</td>
                     <td>
                     <button>+</button>
                     <button>-</button>
                     </td>
                     <td>total price</td>
                  </tr>
               </tbody>
            </table>
         </section>
      `;
   },
};
