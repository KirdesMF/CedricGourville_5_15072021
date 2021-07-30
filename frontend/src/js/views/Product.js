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
         <section class="product panel" >
            <div class="wrapper">
               <div class="product__inner" >
                  <img 
                     src="${datas.imageUrl}"
                     alt="${datas.description}"
                     data-name="${datas.name}"
                     data-id="${datas._id}" 
                     data-price="${datas.price}"
                  />
                  <div class="product__content" >
                     <h1>${datas.name}</h1>
                     <p>${datas.description}</p>
                     <b>
                        ${formatedPrice}
                     </b>
                     <select data-cart="options" >
                        ${options}
                     </select>
                     <button data-cart="btn" >Add to cart</button>
                  </div>
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
            id: product.getAttribute('data-id'),
            name: product.getAttribute('data-name'),
            price: product.getAttribute('data-price'),
            quantity: 1,
            option: select.value,
         };

         useStorage.addItem(datas);
      });
   },
};
