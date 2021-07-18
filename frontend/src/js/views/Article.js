export const Article = {
   render: async () => {
      const path = window.location.pathname.slice(1);
      const title = path;
      const datas = await getDatasApi(path);
      const images = datas
         .map(
            (d) =>
               `<a data-router="true" class="article__card" href="/${path}/?id=${d._id}" >
                  <img width="320" height="240" src="${d.imageUrl}" />
                  <div>
                     <h2>${d.name}</h2>
                     <small>${d.price}€</small>
                  </div>
               </a>
               `
         )
         .join('');

      return /* html */ `
         <section class="article panel h100 grid grid-center">
            <div class="wrapper grid-flow" id="myContainer">
               <h1>${title}</h1>
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
