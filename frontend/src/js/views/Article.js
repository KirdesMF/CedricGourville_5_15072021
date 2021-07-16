const colors = {
   '/': 'red',
   '/teddies': 'green',
   '/cameras': 'pink',
   '/furnitures': 'blue',
};

export const Article = {
   render: () => {
      const pathname = window.location.pathname;
      const color = colors[pathname];
      document.body.style.background = color;
      return `
         <section>
            <h1>Article</h1>
         </section>
      `;
   },
};
