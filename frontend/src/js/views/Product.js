import { formatPrice } from '../utils/utils';

export const Product = {
   render: async () => {
      const href = window.location.href;
      const path = window.location.pathname.slice(1);
      const url = new URL(href);
      const id = url.searchParams.get('id');
      const datas = await getImagesApi(path, id);

      return /*html */ `
         <section class="product panel" >
            <div class="wrapper">
               <div class="product__inner" >
                  <img src="${datas.imageUrl}" />
                  <div class="product__content" >
                     <h1>${datas.name}</h1>
                     <p>${datas.description}</p>
                     <b>${formatPrice(datas.price)}</b>
                     <button>Add to cart</button>
                  </div>
               </div>
            </div>
         </section>
      `;
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
