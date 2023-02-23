import { formatearDinero } from "../helpers"
import { useQuiosco } from "../hooks/useQuiosco"

export const Producto = ({ producto }) => {

    const { handleClickModel, handleSetProducto } = useQuiosco();
    const { nombre, precio, imagen } = producto

  return (
    <div className="border p-3 shadow bg-white">
      <img 
        src={`img/${imagen}.jpg`}
        alt={`imagen ${nombre}`}
        className="w-full"
      />


      <div className="p-5">
        <h3 className="text-xl font-bold">{nombre}</h3>
        <p className="mt-2 font-black text-xl text-amber-500">
          {formatearDinero(precio)}
        </p>

      <button
        type="button"
        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
        onClick={() => {
          handleClickModel();
          handleSetProducto(producto);
        }}
      >
        Agregar
      </button>

      </div>

    </div>




  )
}
