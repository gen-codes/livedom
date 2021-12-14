import LiveDom from "livedom";

export function kebabCase(string: string) {
  return string.replace(/([a-z][A-Z])/g, function (match: string) {
    return match.substr(0, 1) + '-' + match.substr(1, 1).toLowerCase();
  }).toLowerCase().replace(/[^-a-z0-9]+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
}


export const compareObjects = (a: { [x: string]: any; } | null, b: { [x: string]: any; } | null) => {
  if (a === b) return true;
  if (typeof a != 'object' || typeof b != 'object' || a == null || b == null) return false;
  let keysA = Object.keys(a), keysB = Object.keys(b);
  if (keysA.length != keysB.length) return false;
  for (let key of keysA) {
    if (!keysB.includes(key)) return false;
    if (typeof a[key] === 'function' || typeof b[key] === 'function') {
      if (a[key].toString() != b[key].toString()) return false;
    } else {
      if (!compareObjects(a[key], b[key])) return false;
    }
  }
  return true;
}
