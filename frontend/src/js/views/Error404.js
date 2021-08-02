function render() {
   return /* html */ `
         <section class="error panel h100">
            <div class="wrapper grid-flow grid-items-center  h100">
               <h1>404</h1>
               <a class="back" href="/" data-router="true">
                  <svg
                     class="svg-icon"
                     focusable="false"
                     role="img"
                     aria-hidden="true"
                  >
                     <use href="#chevron-icon" />
                  </svg>
                  <span>There is something wrong</span>
               </a>
            </div>
         </section>
      `;
}

export const Error404 = {
   render,
};
