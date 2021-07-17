export const Article = {
   render: async () => {
      const path = window.location.pathname.slice(1);
      const title = path.toUpperCase();
      const datas = await getDatasApi(path);
      const images = datas.map((d) => `<img src="${d.imageUrl}" />`).join('');

      return /* html */ `
         <section class="panel mh100 grid grid-center">
            <div class="wrapper" id="myContainer">
               <h1>${title}</h1>
               <div>${images}</div>
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
