// export { default as DiffPatchDom } from './DiffPatchDom';
// export { default as LiveElement } from './LiveElement';
export * from './live'
import { createElement } from './createElement';
import DiffPatchDom from "@livedom/diff-patch";
const patcher = new DiffPatchDom();
function LiveDom (){

}
LiveDom.patcher = patcher;
LiveDom.current = null as any;
LiveDom.createElement = createElement;


export default LiveDom;

export * from './hooks'
export * from './render'

