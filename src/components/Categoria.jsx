import { useQuiosco } from "../hooks/useQuiosco"

export const Categoria = ({ categoria }) => {

  const {handleClickCategoria, categoriaActual} =  useQuiosco();
  const { icono, id, nombre} = categoria
  //console.log(id);


  return (
    <div className={`${categoriaActual.id === id ? "bg-amber-400" : "bg-white"} flex items-center gap-4 border w-full p-3  hover:bg-amber-400 cursor-pointer`}>
        <img 
            src={`/img/icono_${icono}.svg`} 
            alt="Img icono" 
            className="w-12"
        />
        <button 
          className="text-lg font-bold cursor-pointer truncate"
          type="button"
          onClick={()=>handleClickCategoria(id)}
        >
          { nombre }
        </button>
    </div>
  )
}

// handleClickCategoria(id) llamar una funcion por eso se usa ()=>

