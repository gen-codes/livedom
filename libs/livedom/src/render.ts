import LiveDom from "livedom";
import { createElement } from "./createElement";

export function render(Element, container) {
  container.replaceChildren(createElement(Element));
}