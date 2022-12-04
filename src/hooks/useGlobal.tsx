import { useContext } from "react";
import { GlobalContext } from 'context/global.context';

export default function useGlobal() {
  return useContext(GlobalContext);
}