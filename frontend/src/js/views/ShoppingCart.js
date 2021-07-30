import { FormCart } from '../components/FormCart';
import { TableCart } from '../components/TableCart';
import { useStorage } from '../utils/local-storage';

export const ShoppingCart = {
   render: async function () {
      const category = window.history.state.category;
      const datas = useStorage.getProductFromCategory(category);

      const table = await TableCart.render(category, datas);
      const form = await FormCart.render();

      if (!datas.length) return `<div>YOUR CART IS EMPTY</div>`;

      return /* html */ `
         <section class="shopping-cart panel h100 grid-flow grid-center">
            ${table}
         </section>
         <section class="panel">${form}</section>
      `;
   },
   set: function () {
      const category = window.history.state.category;
      const datas = useStorage.getProductFromCategory(category);

      if (!datas.length) return;
      FormCart.set(category, datas);
      TableCart.set();
   },
};
