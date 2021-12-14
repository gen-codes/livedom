import { kebabCase } from "livedom/utils";
import LiveDom from "livedom";
import LiveElement from "livedom/LiveElement";


export const createContext = (defaultValue: any, name: string): any => {
  const ContextElement = contextFactory(defaultValue);
  customElements.define(kebabCase(name), ContextElement);

  ContextElement.customName = name
  return {
    defaultValue,
    Provider: ContextElement,
    name: kebabCase(name)
  }
}
export function contextFactory(defaultValue: any) {
  return class ContextElement extends LiveElement {
    static customName: any;
    static isContext = true;
    constructor(props:Record<string, any>) {
      super(props);
      const element = LiveDom.current
      element.currentHook = element.currentHook !== null ? element.currentHook + 1 : 0;      this.renderers = [];
      if(!element.toBeHandled){
        element.toBeHandled = true
        element.handle = (tagName, props) => {
          if(tagName.isContext){
            element.currentHook = element.currentHook !== null ? element.currentHook + 1 : 0;
            element.hooks.get(element.currentHook).setValue(props.value);
          }
        }
      }
      element.hooks.set(element.currentHook, this);
    }
    value: any;
    renderers: any[];
    setValue(value: any) {
      this.value = value;
      this.renderers.forEach(renderer => renderer(value));
    }
    addRenderer(renderer: (v:any)=>void) {
      this.renderers.push(renderer);
    }
    async connectedCallback() {
      this.value = this.props.value;

    }

  };
}
