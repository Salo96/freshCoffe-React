import { createContext, useState } from "react";
import { categorias as categoriasDB } from '../data/categorias'

const QuioscoContext = createContext();

export const QuioscoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState(categoriasDB);
    const [categoriaActual, setCategoriaActual] = useState(categorias[0]);

    const handleClickCategoria = id =>{
        ///console.log(id);
        //buscar y devolver un nuevo arreglo
        const categoria = categorias.filter(categoria => categoria.id === id)[0];//<- accede directamente el valor del arreglo
        //console.log(categoria);
        //setCategoriaActual tendra el valor de categoria
        setCategoriaActual(categoria)
    }

    //console.log(categorias[0]);
    // const hola = "hola mundo";

  return (
    <QuioscoContext.Provider
        value={{
            //aqio mando la categorias al sidebar(cuerpo)
            categorias,
            categoriaActual,
            handleClickCategoria
        }}
    >
        {children}
    </QuioscoContext.Provider>
  )
}

export default QuioscoContext
