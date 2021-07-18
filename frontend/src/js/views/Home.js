const LINKS = [
   { path: '/teddies', text: 'Teddies' },
   { path: '/cameras', text: 'Cameras' },
   { path: '/furniture', text: 'Furnitures' },
];

const anchors = LINKS.map(
   (link) => `<a href="${link.path}" data-router="true">${link.text}</a>`
).join('');

export const Home = {
   render: () => {
      return /* html */ `
         <section class="home panel h100">
            <nav class="home__nav wrapper h100">
               ${anchors}
            </nav>
         </section>
      `;
   },
};
