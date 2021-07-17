export const Article = {
   render: async () => {
      const path = window.location.pathname.slice(1);
      const title = path.toUpperCase();
      const datas = await getDatasApi(path);
      console.log(datas);
      const images = datas
         .map(
            (d) =>
               `<a data-router="true" href="/${path}/${d['_id']}" ><img src="${d.imageUrl}" /></a>`
         )
         .join('');

      return /* html */ `
         <section class="panel h100 grid grid-center">
            <div class="wrapper grid-flow" id="myContainer">
               <h1>${title}</h1>
               <div class="grid-images" >${images}</div>
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
