export const Home = {
   render: () => {
      const pathname = window.location.pathname;
      pathname === '/' ? (document.body.style.background = 'red') : '';
      return `
         <nav>
            <a href="/teddies" ></a>
            <a href="/cameras" ></a>
            <a href="/furnitures" ></a>
         </nav>
      `;
   },
};
