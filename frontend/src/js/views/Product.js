import { triggerEvent } from '../utils/event';
import { getProductFromAPI } from '../utils/fetch';
import { useStorage } from '../utils/local-storage';
import {
   countKeyframes,
   errorKeyframes,
   optionsAnimation,
} from '../utils/transition';
import { formatPrice, getOptionsFromDatas } from '../utils/utils';
import { setZoom } from '../utils/zoom';

async function render() {
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
                  <a data-router href="/${category}" class="back" >
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

                  <article class="product__card" >
                     <div data-zoom>
                        <img 
                           src="${datas.imageUrl}"
                           alt="${datas.description}"
                           data-name="${datas.name}"
                           data-id="${datas._id}" 
                           data-price="${datas.price}"
                        />
                     </div>
                     <div class="product__content grid-flow" >
                        <h1>
                           <span class="title">${datas.name}</span>
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
}

function set() {
   const category = window.history.state.category;

   const btn = document.querySelector(`[data-cart="btn"]`);
   const select = document.querySelector(`[data-cart="options"]`);
   const product = document.querySelector('[data-id]');
   const count = document.querySelector('[data-count]');
   const error = document.querySelector('[data-error]');
   const zoom = document.querySelector('[data-zoom]');

   zoom.addEventListener('mousemove', setZoom);

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
         triggerEvent('shopping');
         count.animate(countKeyframes, optionsAnimation);
      } else {
         error.animate(errorKeyframes, optionsAnimation);
      }
   });
}

export const Product = {
   render,
   set,
};
