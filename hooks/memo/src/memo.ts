import LiveDom from 'livedom'
import { compareObjects } from 'livedom/utils'
export interface DomMap {
  callback: (data: any, index: number, array: any[]) => any,
  deps: any[],
  opts: { key: (data: any) => string }
}


export const memo = (input) => {
  switch (typeof input) {
    case 'function':
      // return memoize(input);
      return input
    case 'object':
      if (Array.isArray(input)) {
        const origMap = input.map
        return {
          map: (callback: DomMap['callback'], deps: DomMap['deps'], opts: DomMap['opts']): any[] => {
            const element = LiveDom.current
            element.currentHook = element.currentHook !== null? element.currentHook + 1 : 0;
            const currentHook = element.currentHook;

            // @ts-ignore
            if (input.length === 0 ) {
              
              const set = element.hooks.get(currentHook)
              set && set.clear()
              return []

            }
            // let shouldFlush = false
            // if (deps.length) {
            //   shouldFlush = true
            // }
            // if (shouldFlush) {
            //   return origMap.call(input, callback)

            // }
            const accessedKeys = new Set()
            const hijackedCallback = (data: any, index: any, array: any) => {
              const key = opts.key ? opts.key(data) : index
              if (!element.hooks.has(currentHook)) {
                element.hooks.set(currentHook, new Map())
              }
              accessedKeys.add(key)
              const mapsSet = element.hooks.get(currentHook)
              const item = mapsSet.get(key)
              if (item) {
                if (compareObjects(data, item.data)) {
                  if (item.index !== index) {
                    mapsSet.set(key, { ...item, index })
                  }
                  return item.element
                }
              }
              const child = callback(data, index, array)
              element.hooks.get(currentHook).set(key, { data, element: child, index })
              return child
            }
            for (const key in element.hooks.keys()) {
              if (!accessedKeys.has(key)) {
                element.hooks.get(currentHook).delete(key)
              }
            }

            const result = origMap.call(input, hijackedCallback)
            // if (result.length === 0) {
            //   return []
            // }
            result.memoized = true
            return result
          }
        }
      }
      return input;
    default:
      return input;
  }
}
