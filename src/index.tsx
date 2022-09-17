/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import { Quiz } from './Quiz';
import { questions } from './data';

render(() => <Quiz questions={questions} />, document.getElementById('root') as HTMLElement);
