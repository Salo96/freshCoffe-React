import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Entra a tu Cuenta</h1>
      <p>Para pedir un pedido debes iniciar sesion</p>

      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form>
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

          <input type="submit"
            value="Enviar"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          />

        </form>

        <nav className="mt-5">
          <Link to="/auth/registro">
            ¿No tiene cuenta? crea una
          </Link>
        </nav>

      </div>
    </>
  )
}
