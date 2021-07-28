import { FormCart } from '../components/FormCart';
import { TableCart } from '../components/TableCart';
import { useStorage } from '../utils/local-storage';

export const ShoppingCart = {
   render: async () => {
      const category = history.state.category;
      const datas = useStorage.getCategory(category);
      const form = await FormCart();

      console.log(datas, `cat: ${category}`);

      return /* html */ `
         <section class="shopping-cart panel h100 grid-flow grid-center">
            <table>
               <thead>
                  <tr>
                     <th colspan="100">Shopping Cart ${category}</th>
                  </tr>
               </thead>
               <tbody>
                  ${datas
                     .map((d) =>
                        TableCart({
                           name: d.name,
                           id: d.id,
                           quantity: d.quantity,
                           price: d.price,
                        })
                     )
                     .join('')}
               </tbody>
            </table>
         </section>
         <section class="panel" >${form}</section>
      `;
   },
};
