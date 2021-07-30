import { FormCart } from '../components/FormCart';
import { TableCart } from '../components/TableCart';
import { useStorage } from '../utils/local-storage';

const EmptyCart = (category) => {
   return /* html */ `
      <div>
         <h1>YOUR ${category} CART IS EMPTY</h1>
         <a data-router href="/${category === 'all' ? '' : category}">Back</a>
      </div>
   `;
};

const HomeCart = async () => {
   const keys = Object.keys(localStorage);
   const values = Object.values(localStorage);

   if (values.every((v) => v === '[]')) return EmptyCart('all');

   const promises = keys.map(async (category) => {
      const datas = useStorage.getProductFromCategory(category);

      return TableCart.render(category, datas);
   });

   const home = await Promise.all(promises);

   return /* html */ `
      <section class="shopping-cart panel h100 grid-flow grid-center">
         ${home.join('')}
      </section>
   `;
};

export const ShoppingCart = {
   render: async function () {
      const category = window.history.state.category;
      const datas = useStorage.getProductFromCategory(category);

      const table = await TableCart.render(category, datas);
      const form = await FormCart.render();

      if (category === 'all') return HomeCart();
      if (!datas.length) return EmptyCart(category);

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

      if (category === 'all') TableCart.set();
      if (!datas.length) return;

      FormCart.set(category, datas);
      TableCart.set();
   },
};
