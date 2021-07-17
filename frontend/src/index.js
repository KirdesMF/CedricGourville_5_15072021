import './styles.scss';
import './js/router/router';

import { Header } from './js/components/Header';

document.body.insertAdjacentHTML('afterbegin', Header.render());
