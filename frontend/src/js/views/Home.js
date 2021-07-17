const LINKS = [
   { path: '/teddies', text: 'Teddies' },
   { path: '/cameras', text: 'Cameras' },
   { path: '/furniture', text: 'Furniture' },
];

const anchors = LINKS.map(
   (link) =>
      `<a href="${link.path}" class="nav__a" data-router="true">${link.text}</a>`
).join('');

export const Home = {
   render: () => {
      return /* html */ `
         <section class="home panel h100 grid grid-center">
            <div class="grid-flow  wrapper">
               <h1>Séléction de nos meilleures ventes</h1>
               <nav class="nav">
                  ${anchors}
               </nav>
            </div>
         </section>
      `;
   },
};
