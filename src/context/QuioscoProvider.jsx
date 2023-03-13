import { createContext, useEffect, useState } from "react";
import { categorias as categoriasDB } from '../data/categorias'
import { toast } from "react-toastify";
import  { clienteAxios }  from "../config/axios";

const QuioscoContext = createContext();

export const QuioscoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
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

    const obtenerCategorias = async () => {
        try {
            //se ocupa data para entrar directamente
            const {data} = await clienteAxios('/api/categorias');
            //console.log(data.data);
            setCategorias(data.data);
            setCategoriaActual(data.data[0])// [0] se va poner en la pocision 0
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        obtenerCategorias();
    }, [])
    
    

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

    const handleSubmitNuevaOrden = async( logout ) => {
            //el token lo tengo el localstorage, lo capturo
            const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const { data } = await clienteAxios.post('/api/pedido',
            {
                total,
                //arreglo nuevo con MAP solo el id y cantidad quiero guardar en bd
                productos: pedido.map( producto => {
                    return{
                        id: producto.id,
                        cantidad: producto.cantidad
                    }
                }),
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            //mensaje de succes que biene del back
            toast.success(data.message);

            //despues de un segundo pedido va estar vacio
            setTimeout(() => {
                setPedido([]);
            }, 1000);

            //cerrar la session del usuario
            setTimeout(() => {
                localStorage.removeItem('AUTH_TOKEN');
                logout();
            }, 3000);
            
            
            //console.log(pedido);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <QuioscoContext.Provider
        value={{
            //aqui mando variable y funciones en cualquier lugar de la app
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
            total,
            handleSubmitNuevaOrden
        }}
    >
        {children}
    </QuioscoContext.Provider>
  )
}

export default QuioscoContext
