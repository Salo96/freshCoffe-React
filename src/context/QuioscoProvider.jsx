import { createContext, useEffect, useState } from "react";
import { categorias as categoriasDB } from '../data/categorias'
import { toast } from "react-toastify";

const QuioscoContext = createContext();

export const QuioscoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState(categoriasDB);
    const [categoriaActual, setCategoriaActual] = useState(categorias[0]);
    const [modal, setModal] = useState(false);
    const [producto, setProducto] = useState({});
    const [pedido, setPedido] = useState([]);
    const [total, setTotal] = useState(0)

    //total a pagar
    useEffect(() => {

        //total es un acumulador y producto es elemento que esta interando
        const nuevoToatal = pedido.reduce( (total, producto) => (producto.precio * producto.cantidad) + total, 0 )
        setTotal(nuevoToatal)
    }, [pedido])
    

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

    //se quita la categoria_id y la img, y los ..producto lo que tengas excepto lo anterior
    //sacamos algunos de los objeto
    const handleAgregarPedido = ({ categoria_id, ...producto}) => {
        //tomale una copia que tenga en pedido y agregale este producto nuevo
        
        // console.log(producto);

        //si el pedido ya existe modificar la cantidad sino agregar el pedido
        if(pedido.some( pedidoState => pedidoState.id === producto.id )){
            //console.log("si esta en el pedido");

            const pedidoActualizado = pedido.map( pedidoState => pedidoState.id === producto.id ? producto : pedidoState ) 
            setPedido(pedidoActualizado)
            toast.success('actualizado el pedido')

        } else{
            setPedido([...pedido, producto]);
            toast.success('agregado al pedido')
        }
    }

    const handleEditarCantidad = id =>{
        //console.log(id);

        const productoActualizar = pedido.filter(producto => producto.id === id)[0]
        setProducto(productoActualizar)
        setModal(!modal);
    }

    const handleEliminarProductoPedido = id =>{
        //console.log(id);

        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
        toast.success("elimando correctamente")
    }

  return (
    <QuioscoContext.Provider
        value={{
            //aqui mando varieable y funciones en cualquier lugar de la app
            categorias,
            categoriaActual,
            handleClickCategoria,
            modal,
            handleClickModel,
            producto,
            handleSetProducto,
            pedido,
            handleAgregarPedido,
            handleEditarCantidad,
            handleEliminarProductoPedido,
            total
        }}
    >
        {children}
    </QuioscoContext.Provider>
  )
}

export default QuioscoContext
