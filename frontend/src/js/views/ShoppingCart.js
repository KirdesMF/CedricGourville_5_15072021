import { FormCart } from '../components/FormCart';
import { TableCart } from '../components/TableCart';
import { useStorage } from '../utils/local-storage';

export const ShoppingCart = {
   render: async () => {
      const category = history.state.category;
      const datas = useStorage.getCategory(category);
      const form = await FormCart.render();
      const table = TableCart(datas);

      console.log(process.env.HOST);

      if (datas && !datas.length) return `<div>YOUR CART IS EMPTY</div>`;

      return /* html */ `
         <section class="shopping-cart panel h100 grid-flow grid-center">
            ${table}
         </section>
         <section class="panel">${form}</section>
      `;
   },
   set: () => {
      const category = history.state.category;
      const datas = useStorage.getCategory(category);
      if (datas && datas.length) FormCart.set();
   },
};
