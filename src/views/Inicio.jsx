import useSWR from "swr";
import { Producto } from "../components/Producto";
import { Spinner } from "../components/Spinner";
import { clienteAxios } from "../config/axios";
import { useQuiosco } from "../hooks/useQuiosco";

export const Inicio = () => {

  const { categoriaActual } = useQuiosco();

  //consulta SWR
  const fetcher = () => clienteAxios('/api/productos').then(data => data.data)

  const { data, error, isLoading } = useSWR('/api/productos', fetcher, {
    refreshInterval: 1000
  })
  
  // console.log(data);
  // console.log(error);
  // console.log(isLoading);

  if(isLoading) return <Spinner />


  //filtrar el producto por categoria (filter te retorna nuevo arreglo o objeto)
  const productos = data.data.filter(producto => producto.categoria_id === categoriaActual.id);

  //console.log(productos);
  // console.log(hola);

  return (
    <>
      <h1 className="text-4xl font-black">{categoriaActual.nombre}</h1>
      <p className="text-2xl my-10">
        Elige y personaliza tu pedido a continuación
      </p>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        { productos.map( producto =>(
          <Producto 
            key      = { producto.id }
            producto = { producto }   
          />
        ))}
      </div>

    </>
  )
}
