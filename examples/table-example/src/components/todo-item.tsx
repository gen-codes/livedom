import  { useContext, useEffect, live } from "livedom";
import { TodoContext } from "./todo-context";

export default function TodoItem(props){
  const { note, id, onDone } = props
  // useEffect(() => {
  //   setTimeout(() => {
  //     window.rerenders++
  //     onDone();

  //   },3000)
  // },[])
  return <li>
    {note}
    <button type="button" value={id} onClick={onDone}>done
    </button>
  </li>

}