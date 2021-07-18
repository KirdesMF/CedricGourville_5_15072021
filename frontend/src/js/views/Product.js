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
                  <h1>${datas.name}</h1>
                  <img src="${datas.imageUrl}" />
                  <p>${datas.description}</p>
                  <small>${datas.price}</small>
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
