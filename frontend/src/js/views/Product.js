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
                           <button class="cta"  data-cart="btn" >
                              <span class="cta__shadow"></span>
                              <span class="cta__front">Add to cart</span>
                              <span data-count>+1</span>
                              <span data-error>Max 10 articles</span>
                           </button>
                           <a href="/${category}/shopping-cart" data-router class="cta">
                              <span class="cta__shadow"></span>
                              <span class="cta__front">Order it</span>
                           </a>
                        </div>
                     </div>
                  </article>
               </div>
            </div>
         </section>
      `;
   },

   set: () => {
      const category = window.history.state.category;

      const btn = document.querySelector(`[data-cart="btn"]`);
      const select = document.querySelector(`[data-cart="options"]`);
      const product = document.querySelector('[data-id]');
      const count = document.querySelector('[data-count]');
      const error = document.querySelector('[data-error]');

      btn.addEventListener('click', (event) => {
         event.preventDefault();

         const datas = {
            category: category,
            id: product.dataset.id,
            name: product.dataset.name,
            price: product.dataset.price,
            quantity: 1,
            option: select.value,
         };

         const isMax = useStorage.addItem(datas);

         if (!isMax) {
            //TODO create function to trigger event
            const customEvent = new Event('shopping');
            window.dispatchEvent(customEvent);

            count.animate(
               [
                  { transform: 'translateY(0px)', opacity: 0 },
                  { transform: 'translateY(-20px)', opacity: 1 },
                  { transform: 'translateY(-35px)', opacity: 0 },
               ],
               {
                  duration: 600,
                  easing: 'ease-in',
               }
            );
         } else {
            error.animate(
               [
                  { transform: 'translate(-50%, 0px) ', opacity: 0 },
                  {
                     transform: 'translate(-50%, 25px)',
                     opacity: 1,
                     offset: 0.2,
                  },
                  { transform: 'translate(-50%, 25px)', opacity: 1 },
                  {
                     transform: 'translate(-50%, 0px)',
                     opacity: 0,
                     offset: 0.9,
                  },
               ],
               {
                  duration: 1000,
                  easing: 'ease-in',
               }
            );
         }
      });
   },
};
