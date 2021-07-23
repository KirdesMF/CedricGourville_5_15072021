import { formatPrice } from '../utils/utils';

export const Article = {
   render: async () => {
      const path = window.location.pathname.slice(1);
      const datas = await getDatasApi(path);

      const images = datas
         .map(
            (d) =>
               // prettier-ignore
               `<a href="/${path}?id=${d._id }" data-router="true" class="article__card">
                  <img width="320" height="240" src="${d.imageUrl}" />
                  <div>
                     <h2>${d.name}</h2>
                     <small>${formatPrice(d.price)}</small>
                  </div>
               </a>
               `
         )
         .join('');

      return /* html */ `
         <section class="article panel h100 grid grid-center">
            <div class="wrapper grid-flow" id="myContainer">
               <h1>${path}</h1>
               <div class="article__grid">${images}</div>
            </div>
         </section>
      `;
   },
};

async function getDatasApi(path) {
   try {
      const res = await fetch(`http://localhost:3000/api/${path}`);
      if (!res.ok) {
         console.log(res.status);
         return;
      }

      return res.json();
   } catch (err) {
      console.log(err);
   }
}
