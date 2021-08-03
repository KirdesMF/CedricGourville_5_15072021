import { FormCart } from '../components/FormCart';
import { TableCart } from '../components/TableCart';
import { useStorage } from '../utils/local-storage';

const EmptyCart = (category) => {
   const message =
      category === 'all'
         ? 'All your carts are empty'
         : `Your <span>${category}</span> cart is empty`;

   const link = category === 'all' ? '' : category;

   return /* html */ `
      <section class="empty-cart grid grid-items-center h100">
         <div class="wrapper empty-cart__content">
            <a data-router href="/${link}" class="back" >
               <svg
                  class="svg-icon"
                  focusable="false"
                  role="img"
                  aria-hidden="true"
               >
                  <use href="#chevron-icon" />
               </svg>
               <span>Back</span>
            </a>
            <h1>${message}</h1>
         </div>
      </section>
   `;
};

const HomeCart = async () => {
   const keys = useStorage.getAllKeys();
   const isEmpty = useStorage.checkIsEmpty();

   if (isEmpty) return EmptyCart('all');

   const promises = keys.map(async (category) => {
      const datas = useStorage.getProductFromCategory(category);
      return TableCart.render(category, datas);
   });

   const home = await Promise.all(promises);

   return /* html */ `
      <section class="shopping-cart panel">
         <div class="wrapper grid-flow" >
            <div class="shopping-cart__title">
               <h1 class="title">Shopping Cart Home</h1>
               <a href="/" data-router class="back">
                  <svg
                     class="svg-icon"
                     focusable="false"
                     role="img"
                     aria-hidden="true"
                  >
                     <use href="#chevron-icon" />
                  </svg>
                  <span>Back</span>
               </a>
            </div>
            ${home.join('')}
         </div>
      </section>
   `;
};

async function render() {
   const category = window.history.state.category;
   const datas = useStorage.getProductFromCategory(category);
   const isEmpty = useStorage.checkIsCategoryEmpty(category);
   const link = category === 'all' ? '' : category;

   const table = await TableCart.render(category, datas);
   const form = await FormCart.render();

   if (isEmpty) return EmptyCart(category);
   if (category === 'all') return HomeCart();

   return /* html */ `
         <section class="shopping-cart panel">
            <div class="wrapper grid-flow" >
               <div class="shopping-cart__title">
                  <h1 class="title">Shopping Cart ${category}</h1>
                  <a href="/${link}" data-router class="back">
                     <svg
                        class="svg-icon"
                        focusable="false"
                        role="img"
                        aria-hidden="true"
                     >
                        <use href="#chevron-icon" />
                     </svg>
                     <span>Back</span>
                  </a>
               </div>
               ${table}
            </div>
         </section>
         <section class="panel form-cart">
            <div class="wrapper grid-flow" >
               <h2 class="title">Order</h2>
               ${form}
            </div>
         </section>
      `;
}

function set() {
   const category = window.history.state.category;
   const datas = useStorage.getProductFromCategory(category);
   const isEmpty = useStorage.checkIsCategoryEmpty(category);

   if (isEmpty) return;
   if (category === 'all') return TableCart.set();

   TableCart.set();
   FormCart.set(category, datas);
}

export const ShoppingCart = {
   render,
   set,
};
