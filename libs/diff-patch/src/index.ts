
export default class DiffPatchDom {
  previous: any;
  next: any;
  dom: Record<string, Function>;
  mutations: any=[];
  constructor() {
    this.mutations = [];
    this.dom = new Proxy({}, {
      get: (_, type) => {
        return (...args: any[])=>{
          this.mutations.push({
            type,
            args
          })
        }
      }
    })
  }
  flush(){
    this.mutations = []
  }
  diff(previous: NodeListOf<ChildNode>, next: any[]) {
    if (next.length === 0) {
      this.dom.replaceChildren()
    } else if (Array.isArray(next)) {
      for (let index = 0; index < next.length; index++) {
        const child = next[index];
        if (child !== previous[index]) {
          var childIndex = Array.prototype.indexOf.call(previous, child);
          // Array.prototype.indexOf.call(this.dom.childNodes, child)
          if (previous[index]) {
            const domChildIndex = next.indexOf(previous[index]);
            if (domChildIndex === -1) {
              this.dom.removeChild(previous[index])
              index--
              continue
            }
    
          }
          if (childIndex === -1 && index === next.length - 1) {
            this.dom.appendChild(child)
          } else if (childIndex === -1) {
            this.dom.insertBefore(child, previous[index + 1])
          }
          else if (childIndex) {
            this.dom.insertBefore(previous[childIndex], previous[index])
          }
        }
      }
      if (next.length < previous.length) {
        for (let i = next.length; i < previous.length; i++) {
          this.dom.removeChild(previous[i])
        }
      }
    } else {
      this.dom.replaceChildren(next);
    
    }
    return this
  }
  patch(component: any) {
    this.mutations.forEach((mutation: any)=>{
      component[mutation.type](...mutation.args)
    })
    this.flush()
  }
}
