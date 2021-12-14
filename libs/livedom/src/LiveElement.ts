import LiveDom from "./";

export default class LiveElement extends HTMLElement {
  toBeHandled: any;
  isHandled: boolean;
  constructor(props: Record<string, any> = {}, root: boolean = false) {
    super();
    this.props = {...props, children: this.childNodes};
    this.currentHook = null;
  }
  static isLive = true;
  onlyHooks: boolean = false;
  render: any;
  props: any;
  maps = new Map();
  hooks = new Map();
  currentHook: number | null;
  providers = new Map();
  currentProvider: number | null = null;
  selectors = new Map();
  setCurrent() {
    LiveDom.current = this;
  }
  updateChildren(children: string | Node|false) {
    this.currentHook = null;
    if(this.isHandled){
      return;
    }
    if(Array.isArray(children)) {
      if(children.memoized) {
        LiveDom.patcher.diff(this.childNodes, children).patch(this);
      }else{
        this.replaceChildren(...children)
      }
    }else{
      this.replaceChildren(children);
    }
    if(this.toBeHandled){
      this.isHandled = true;
    }
  }
  connectedCallback() {
    this.render()
  }
}

