import {
   formatPrice,
   getOptionsFromDatas,
   useLocalStorage,
} from '../utils/utils';

export const Product = {
   render: async () => {
      const href = window.location.href;
      const id = new URL(href).searchParams.get('id');
      const path = window.location.pathname.replaceAll('/', '');

      const keyOptions = getOptionsFromDatas(path);

      const datas = await getImagesApi(path, id);
      const options = datas[keyOptions].map(
         (d) => `<option value="${d}">${d}</option>`
      );

      const formatedPrice = formatPrice(datas.price);

      return /*html */ `
         <section class="product panel" >
            <div class="wrapper">
               <div class="product__inner" >
                  <img 
                     src="${datas.imageUrl}"
                     alt="${datas.name}"
                     data-name="${datas.name}"
                     data-id="${id}" 
                     data-category="${path}" 
                     data-price="${datas.price}"
                  />
                  <div class="product__content" >
                     <h1>${datas.name}</h1>
                     <p>${datas.description}</p>
                     <b>
                        ${formatedPrice}
                     </b>
                     <form action="">
                        <input data-cart="quantity" type="number" max="99" min="1" value="1" />
                        <select>
                           ${options}
                        </select>
                        <button type="submit" data-cart="btn" >Add to cart</button>
                     </form>
                  </div>
               </div>
            </div>
         </section>
      `;
   },

   set: () => {
      const btn = document.querySelector(`[data-cart="btn"]`);
      const input = document.querySelector(`[data-cart="quantity"]`);
      const product = document.querySelector('[data-id]');

      btn.addEventListener('click', (e) => {
         e.preventDefault();

         const datas = {
            id: product.getAttribute('data-id'),
            name: product.getAttribute('data-name'),
            price: product.getAttribute('data-price'),
            category: product.getAttribute('data-category'),
            quantity: input.value,
         };

         useLocalStorage.addItem(datas);
      });
   },
};

async function getImagesApi(path, id) {
   try {
      const res = await fetch(`http://localhost:3000/api/${path}/${id}`);

      if (!res.ok) {
         console.log(res.status);

         return;
      }

      return res.json();
   } catch (err) {
      console.log(err);
   }
}
