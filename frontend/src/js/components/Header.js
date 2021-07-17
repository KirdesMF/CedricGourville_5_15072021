export const Header = {
   render: () => {
      return /* html */ `
      <header class="header panel">
         <div class="wrapper grid grid-center">
            <a href="/" data-router="true">
               <svg class="svg-icon">
                  <use href="#orinoco-icon" />
               </svg>
            </a>
         </div>
      </header>
      `;
   },
};
