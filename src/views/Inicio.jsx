import { Producto } from "../components/Producto";
import { productos as data } from "../data/productos";
import { useQuiosco } from "../hooks/useQuiosco";

export const Inicio = () => {

  const { categoriaActual } = useQuiosco();

  //filtrar el producto por categoria (filter te retorna nuevo arreglo o objeto)
  const productos = data.filter(producto => producto.categoria_id === categoriaActual.id);

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
