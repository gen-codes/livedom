
import TodoApp from './components/todo-app';
import {render} from 'livedom'
const app = document.querySelector<HTMLDivElement>('#app')!

render(TodoApp, app)