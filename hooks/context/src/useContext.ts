import LiveDom from "livedom";
import { kebabCase } from "livedom/utils";
// @ts-ignore
export function useContext({ name, defaultValue }, selector?: any) {
  const element = LiveDom.current
  element.currentHook = element.currentHook !== null ? element.currentHook + 1 : 0;
  if (element.hooks.has(element.currentHook)) {
    const contextElement = element.hooks.get(element.currentHook);
    if (selector) {
      return element.selectors.get(element.currentHook);
    }
    return contextElement.value;
  } else {

    let contextElement = element.closest(name)
    // @ts-ignore
    contextElement.addRenderer((currentValue) => {
      if (selector) {
        const selectorValue = selector(currentValue);
        const previous = element.selectors.get(element.currentHook);
        if (previous !== selectorValue) {
          element.selectors.set(element.currentHook, selectorValue)
          element.render();
        }
      } else {
        if (element.hooks.get(element.currentHook) !== currentValue) {
          element.hooks.set(element.currentHook, currentValue);
          element.render();
        }
      }
    })
    if (!contextElement) {
      contextElement = {
        value: defaultValue
      }
    }
    element.hooks.set(element.currentHook, contextElement);
    if (selector) {
      const selectorValue = selector(contextElement.value);
      element.selectors.set(element.currentHook, selectorValue)
      return element.selectors.get(element.currentHook);
    }
    return contextElement.value
  }
};
