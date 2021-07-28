import { Link } from '../components/Links';

export const Home = {
   render: () => {
      return /* html */ `
         <section class="home panel h100">
            <nav class="home__nav wrapper h100">
               ${Link}
            </nav>
         </section>
      `;
   },
};
