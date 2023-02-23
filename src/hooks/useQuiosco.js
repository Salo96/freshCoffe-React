import { useContext } from "react";
import QuioscoContext from "../context/QuioscoProvider";

//como INTERMEDIO DE la conexion de usecontext a quioscocontext
export const useQuiosco = () => {
  return useContext(QuioscoContext)
}
