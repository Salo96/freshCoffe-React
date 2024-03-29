import { useState, useEffect } from 'react';
import { formatearDinero } from '../helpers';
import { useQuiosco } from '../hooks/useQuiosco'

export const ModalProducto = () => {

    const {producto, handleClickModel, handleAgregarPedido, pedido} = useQuiosco();
    const {imagen, nombre, precio} = producto
    const [cantidad, setCantidad] = useState(1)
    const [edicion, setEdicion] = useState(false)
    //console.log(producto);

    useEffect(() => {
        //some: este elemento existe en el pedido
        if(pedido.some( pedidoState => pedidoState.id === producto.id )){
            //console.log("si esta en el pedido");

            const productoEdicion = pedido.filter( pedidoState => pedidoState.id === producto.id )[0]// <- devuelve un arreglo por eso se pone [0]
            setCantidad(productoEdicion.cantidad)
            setEdicion(true)
        }
        //console.log("agregaste algo en el pedido");
    }, [pedido])
    

  return (
    <div className='md:flex gap-10'>
        <div className="md:w-1/3">
            <img src={`/img/${imagen}.jpg`} alt={`producto ${nombre}`} />
        </div>

        <div className="md:w-2/3">
            <div className="flex justify-end">
                <button onClick={handleClickModel}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>

            <h1 className='text-3xl font-bold mt-5'>{ nombre }</h1>
            <p className='mt-5 font-black text-3xl text-amber-500'>{ formatearDinero( precio ) }</p>

            <div className="flex gap-4 mt-5">

                <button
                    type='button'
                    onClick={()=>{
                        if (cantidad <= 1) return
                        setCantidad(cantidad - 1)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                </button>

                <div className="text-3xl">{cantidad}</div>

                <button
                    type='button'
                    onClick={()=>{
                        if (cantidad >= 5) return
                        setCantidad(cantidad + 1)
                    }}
                >

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                </button>

            </div>

            <button
                type='button'
                className='bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded'
                    //llamar 2 metodos diferente en el mismo on click
                onClick={()=>{
                    //asi se envia 2 parametro, los 3 punto es copia todo lo que tengas en producto y agregame la cantidad
                    //unimos todo los objeto
                    handleAgregarPedido({...producto, cantidad})
                    handleClickModel()
                }}
            >
               { edicion ? "guardar cambio" : "añadir al pedido" }
            </button>

        </div>
    </div>
  )
}
