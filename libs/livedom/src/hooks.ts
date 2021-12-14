import {useState} from '@livedom/state';
import {useRef, createRef} from '@livedom/ref';
import {useContext, createContext} from '@livedom/context';
import {useEffect} from '@livedom/effect';
import {useMemo, memo} from '@livedom/memo';

export  {
  useState,
  useRef,
  useContext,
  useEffect,
  useMemo,
  memo,
  createRef,
  createContext
}

// export default new Proxy({} as any, {
//   get: (hooks, type) => {
//     if(hooks[type]){
//       return hooks[type]
//     }
//     switch(type){
//       case 'useState':
//         const {useState} = require('@livedom/state')
//         hooks[type] = useState
//         return useState
//     }
//   }
// })