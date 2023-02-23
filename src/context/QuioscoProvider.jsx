import { createContext, useState } from "react";
import { categorias as categoriasDB } from '../data/categorias'

const QuioscoContext = createContext();

export const QuioscoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState(categoriasDB);
    const [categoriaActual, setCategoriaActual] = useState(categorias[0]);
    const [modal, setModal] = useState(false);
    const [producto, setProducto] = useState({})

    const handleClickCategoria = id =>{
        ///console.log(id);
        //buscar y devolver un nuevo arreglo
        const categoria = categorias.filter(categoria => categoria.id === id)[0];//<- accede directamente el valor del arreglo
        //console.log(categoria);
        //setCategoriaActual tendra el valor de categoria
        setCategoriaActual(categoria);
    }

    //console.log(categorias[0]);
    // const hola = "hola mundo";

    //abre y cierre de modal, con negacion si es true muestra false y arreves
    const handleClickModel = () =>{
        setModal(!modal);
    }

    //agregar producto al modal
    const handleSetProducto = producto =>{
        setProducto(producto);
    }

  return (
    <QuioscoContext.Provider
        value={{
            //aqio mando la categorias al sidebar(cuerpo)
            categorias,
            categoriaActual,
            handleClickCategoria,
            modal,
            handleClickModel,
            producto,
            handleSetProducto
        }}
    >
        {children}
    </QuioscoContext.Provider>
  )
}

export default QuioscoContext
