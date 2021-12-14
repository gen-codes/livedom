import  {useContext, useEffect, live} from 'livedom';
import { TodoContext } from './todo-context';

let j = 0
export default function TodoAdd() {
  const setItems = useContext(TodoContext, ([_, setItems]) => setItems);
  const onSubmit = (e) => {
    var object = {} as any;
    new FormData(e.currentTarget).forEach(function (value, key) {
      object[key] = value;
    });
    e.preventDefault();
    e.target.add.value = '';
    setItems((items) => items.concat([{ note: object.add, id: `${Date.now()}` }]));
  }
  useEffect(() => {
    setTimeout(() => {
      console.time('start')
      const interval = setInterval(() => {
        setItems((oldItems)=>oldItems.concat([{id:`${j++}`,note:`${j}`}]));
      }, 100)
      setTimeout(()=>{
        clearInterval(interval)
        setItems((oldItems)=>{
          console.log(oldItems.length)

          return oldItems
        })
        
      }, 3000)

    },1000)
  }, [])
  return <form onSubmit={onSubmit}>
    <input type="text" name="add" placeholder="add new item" required />
    <button type='submit'>add</button>
  </form>;
}
