import LiveDom from "livedom"

export function useEffect(func: Function, newDeps: any[]) {
  const element = LiveDom.current
  element.currentHook = element.currentHook !== null? element.currentHook + 1 : 0;
  element.currentHook = element.currentHook !== null? element.currentHook + 1 : 0;
  const currentHook = element.currentHook;
  if(!newDeps){
    return func()
  }
  if(element.hooks.has(currentHook)) {
    const {deps, remover} = element.hooks.get(currentHook);
    if(deps.some((dep, i) => dep !== newDeps[i])){
      return func()
    }else {
      return
    }
  }else{
    const remover = func()
    element.hooks.set(currentHook, {
      deps: newDeps,
      remover
    });
  }
    

}
export default useEffect;