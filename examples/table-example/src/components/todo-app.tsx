import {  useState } from 'livedom/hooks';
import TodoAdd from './todo-add';
import { TodoContext } from './todo-context';
import TodoList from './todo-list';
export default function TodoApp() {
    const [todos, setTodos] = useState([{note:"hello",id:Date.now()}]);
    return (
      <div>
      <h1>Todo App</h1>
      <TodoContext.Provider value={[todos, setTodos]}>
        {/* <TodoContextHandler/> */}
        <TodoAdd />
        <TodoList />
      </TodoContext.Provider>
      </div>
    )
    
  }

