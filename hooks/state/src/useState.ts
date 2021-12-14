import LiveDom from "livedom";

export function useState(initialState: any) {
  const element = LiveDom.current
  element.currentHook = element.currentHook !== null? element.currentHook + 1 : 0;
  const currentHook = element.currentHook;
  if(element.hooks.has(currentHook)) {
    return element.hooks.get(currentHook);
  }else{
    function setState(value: any) {
        if (typeof value === 'function') {
          const state = element.hooks.get(currentHook);
          value = [value(state[0]), state[1]];
        }
        element.hooks.set(currentHook, value);
        element.render();
    }
    const initial = [initialState, setState]
    element.hooks.set(currentHook, initial);
    return initial
  }
};

