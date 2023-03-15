import useSWR from "swr";
import { clienteAxios } from '../config/axios';
import { Producto } from "../components/Producto";
import { Spinner } from "../components/Spinner";

export const Productos = () => {

  const token = localStorage.getItem('AUTH_TOKEN');
  const fetcher = () => clienteAxios('/api/productos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(datos => datos.data)

  const { data, error, isLoading } = useSWR('/api/productos', fetcher, {refreshInterval: 10000})

  if (isLoading) return <Spinner />

    console.log(data.data);

  return (
    <div>
      <h1 className="text-4xl font-black">Productos</h1>
      <p className="text-2xl my-10">
        Maneja la disponibilidad aqui
      </p>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        { data.data.map( producto =>(
          <Producto 
            key      = { producto.id }
            producto = { producto }   
            botonDisponible = { true }
          />
        ))}
      </div>

    </div>
  )
}
