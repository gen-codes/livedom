import LiveDom from "./";
import { live } from "./live";
import LiveElement from "./LiveElement";
import { kebabCase } from "./utils";

export function createElement(tagName: typeof LiveElement | CustomElementConstructor, props: any, ...children: any[]): ChildNode {
  let element: LiveElement | HTMLElement | CustomElementConstructor;
  const current = LiveDom.current;
  if(current && current.isHandled){
    return current.handle(tagName, props, children);
  }
  
  switch (typeof tagName) {
    case "string":
      // @ts-ignore
      if (!tagName.includes("-")) {
        element = document.createElement(tagName as string);
        for (let key in props) {
          const lowerKey = key.toLowerCase();
          if (key.startsWith("on") && HTMLElement.prototype.hasOwnProperty(lowerKey)) {
            // @ts-ignore
            element[lowerKey] = props[key];
          } else {
            // @ts-ignore
            element[key] = props[key];
          }
        }
        children.forEach(child => {
          if (typeof child === 'string') {
            element.appendChild(new Text(child))
          } else if (child) {
            if (Array.isArray(child)) {
              child.forEach(c => {
                element.appendChild(c)
              })
            } else {
              element.appendChild(child)
            }
          }
        })
        break;
      } else {
        // @ts-ignore
        tagName = customElements.get(tagName);
      }
    case 'function':
      if (!tagName.isLive) {
        tagName = customElements.get(kebabCase(tagName.name)) || live(tagName);
      }
      
      element = new tagName(props);
      // if (LiveDom.current.providers.size) {
      //   console.log(element)
      // }
      children.forEach(child => {
        if (typeof child === 'string') {
          element.appendChild(new Text(child))
        } else if (child) {
          if (Array.isArray(child)) {
            child.forEach(c => {
              element.appendChild(c)
            })
          } else {
            element.appendChild(child)
          }
        }
      })

  }
  const fragment = document.createDocumentFragment()
  // @ts-ignore
  fragment.appendChild(element)
  // @ts-ignore
  return fragment.firstChild
}