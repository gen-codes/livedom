import { createContext, useEffect, useState } from 'livedom';

const handler = (setState) => {

}
export const TodoContext = createContext(
  [{id: Date.now(), note:'hello'}], 'TodoContext');
