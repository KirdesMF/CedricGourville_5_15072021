export const Product = {
   render: async () => {
      const href = window.location.href;
      const path = window.location.pathname.slice(1);
      const url = new URL(href);
      const id = url.searchParams.get('id');
      const datas = await getImagesApi(path, id);

      return /*html */ `
         <section class="panel" >
            <div class="wrapper grid-flow">
               <h2>PRODUCT</h2>
               <img src="${datas.imageUrl}" />
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
