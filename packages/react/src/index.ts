import { createContext, useContext } from "react";
import Container from '@kibako/core';

export const KibakoContext = createContext<Container | null>(null)

export const useContainer = () => {
  const container = useContext(KibakoContext)

  if(container === null) {
    throw new Error("container is not provided")
  }
}
