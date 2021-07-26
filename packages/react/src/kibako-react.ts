import { createContext, useContext, Context } from "react";
import Container from '@kibako/core';

type KibakoContext = Context<Container | null>

type UseImpl<T extends {(deps: object): ReturnType<T>}>  = (key: T) => ReturnType<T>;

export const buildUseImpl: <T extends {(deps: object): ReturnType<T>}>(ctx: KibakoContext) => UseImpl<T> = (ctx) =>  {
  const container = useContext(ctx)

  return (key) => {
    if(container === null) {
      throw new Error("container is not provided")
    }

    return container.resolve(key)
  }
}

export const createKibakoContext = () => {
  const KibakoContext: KibakoContext = createContext<Container | null>(null)
  const useImpl = buildUseImpl(KibakoContext)
  return {
    KibakoContext,
    useImpl
  }
}
