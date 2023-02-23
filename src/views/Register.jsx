import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Crea Tu Cuenta</h1>
      <p>Crea tu Cuenta llenando el formulario</p>

      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form>
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="name">Nombre</label>
            <input 
              type="text" 
              className="mt-2 w-full p-3 bg-gray-50"
              name="name" 
              id="name" 
              placeholder="Tu Nombre"
            />
          </div>

          <div className="mb-4">
            <label className="text-slate-800" htmlFor="email">Email</label>
            <input 
              type="email" 
              className="mt-2 w-full p-3 bg-gray-50"
              name="email" 
              id="email" 
              placeholder="Tu Correo"
            />
          </div>

          <div className="mb-4">
            <label className="text-slate-800" htmlFor="password">Password</label>
            <input 
              type="password" 
              className="mt-2 w-full p-3 bg-gray-50"
              name="password" 
              id="password" 
              placeholder="Tu Contraseña"
            />
          </div>

          <div className="mb-4">
            <label className="text-slate-800" htmlFor="password_confirmation">Repetir Password</label>
            <input 
              type="password" 
              className="mt-2 w-full p-3 bg-gray-50"
              name="password" 
              id="password" 
              placeholder="Repetir Contraseña"
            />
          </div>

          <input type="submit" 
            value="Crear Cuenta"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          />

        </form>

        <nav className="mt-5">
          <Link to="/auth/login">
            ¿tiene cuenta? Iniciar sesion
          </Link>
        </nav>

      </div>

    </>
  )
}
