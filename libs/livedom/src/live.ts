import { kebabCase } from "./utils";
import LiveElement from "./LiveElement";


export function live(component: Function) {
  const elementClass = class extends LiveElement {
    static customName = component.name;
    constructor(props: Record<string, any> = {}) {
      super(props);
    }
    render =  () => {
      this.setCurrent();
      this.updateChildren(component(this.props));
    };
  };
  customElements.define(kebabCase(component.name), elementClass);
  return elementClass;
}
