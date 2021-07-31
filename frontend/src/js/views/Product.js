import { getProductFromAPI } from '../utils/fetch';
import { useStorage } from '../utils/local-storage';
import { formatPrice, getOptionsFromDatas } from '../utils/utils';

export const Product = {
   render: async () => {
      const href = window.location.href;
      const id = new URL(href).searchParams.get('id');
      const category = window.history.state.category;

      const keyOptions = getOptionsFromDatas(category);
      const datas = await getProductFromAPI(category, id);
      const formatedPrice = formatPrice(datas.price);

      const options = datas[keyOptions].map(
         (d) => `<option value="${d}">${d}</option>`
      );

      return /*html */ `
         <section class="product panel h100 grid grid-items-center" >
            <div class="wrapper">
               <div class="product__inner grid-flow">
                  <a data-router href="/${category}">Back</a>

                  <article class="product__card">
                     <img 
                        src="${datas.imageUrl}"
                        alt="${datas.description}"
                        data-name="${datas.name}"
                        data-id="${datas._id}" 
                        data-price="${datas.price}"
                     />
                     <div class="product__content grid-flow" >
                        <h1>
                           <span>${datas.name}</span>
                           <b>${formatedPrice}</b>
                        </h1>
                        
                        <p>${datas.description}</p>
                        <select data-cart="options">
                           ${options}
                        </select>
                        <div class="product__cta" >
                           <button data-cart="btn" >Add to cart</button>
                           <a href="/${category}/shopping-cart" data-router>Order it</a>
                        </div>
                     </div>
                  </article>
               </div>
            </div>
         </section>
      `;
   },

   set: () => {
      const btn = document.querySelector(`[data-cart="btn"]`);
      const select = document.querySelector(`[data-cart="options"]`);
      const product = document.querySelector('[data-id]');
      const category = window.history.state.category;

      btn.addEventListener('click', (e) => {
         e.preventDefault();

         const datas = {
            category: category,
            id: product.dataset.id,
            name: product.dataset.name,
            price: product.dataset.price,
            quantity: 1,
            option: select.value,
         };

         useStorage.addItem(datas);
      });
   },
};
