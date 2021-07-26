import { createContext, useContext } from "react";
import Container from '@kibako/core';
export { createKibakoContext } from "./kibako-react"

export const KibakoContext = createContext<Container | null>(null)

/*
 * @deprecated Use the `createKibakoContext` instead.
 */
export const useImpl = <T extends {(deps: object): ReturnType<T>}>(key: T): ReturnType<T> => {
  const container = useContext(KibakoContext)

  if(container === null) {
    throw new Error("container is not provided")
  }

  return container.resolve(key)
}
