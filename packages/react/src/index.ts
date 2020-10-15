import { createContext, useContext } from "react";
import Container from '@kibako/core';

export const KibakoContext = createContext<Container>(null as any)

export const useContainer = () => {
  const container = useContext(KibakoContext)
}
