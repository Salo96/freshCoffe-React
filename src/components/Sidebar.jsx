import { useAuth } from '../hooks/useAuth'
import { useQuiosco } from '../hooks/useQuiosco'
import { Categoria } from './Categoria'

export const Sidebar = () => {

    // aqui hago la conexion de Usequiosco a QuioscoProvider donde se encuentra la CATEGORIA 
    const { categorias } = useQuiosco()
    const { logout, user } = useAuth({
        middleware: 'guest',//usuario no autenticado
    })


  return (
    <div className='md:w-72'>
        <div className="p-4">
            <img src="img/logo.svg" alt="IMG" className='w-40'/>
        </div>

        <p className='my-10 text-xl text-center'>Hola: {user?.name}</p>

        <div className="mt-10">
            { categorias.map( categoria =>(
                <Categoria 
                    key       = { categoria.id }
                    categoria = { categoria }
                />
            )) }
        </div>

        

        <div className="my-5 px-5">
            <button
                type='button'
                className='text-center bg-red-500 w-full p-3 font-bold text-white truncate'
                onClick={ logout }
            >
                Cancelar Orden
            </button>
        </div>

    </div>
  )
}