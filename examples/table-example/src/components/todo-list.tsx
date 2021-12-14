import { useContext, memo } from 'livedom';
import { TodoContext } from './todo-context';
import TodoItem from './todo-item';
export default function TodoList() {
  const [items, setItems] = useContext(TodoContext)
  return memo(items).map(item => (
      <TodoItem {...item} onDone={()=>{setItems((newItems)=>{
        // console.log('removing', item);
        return newItems.filter(i => i.id !== item.id)
      })}}
      >
      </TodoItem>

  ),[], {
    key: item => item.id
  })
}



