import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import { Alerta } from "../components/Alerta";
//import { clienteAxios } from "../config/axios";
import { useAuth } from "../hooks/useAuth";


export const Login = () => {


    //createRef-> lee lo que ingresmos en el formulario de registro en los campo
    const emailRef = createRef();
    const passwordRef = createRef();
   
  
    const [errores, setErrores] = useState([]);
    const { login } = useAuth({
      middleware: 'guest',//usuario no autenticado
      url: '/'//si se ha autenticado redirigir a la pag. principal
    });
  
    // funcion cuando le click en registrar
    const handleSubmit = async e => {
      e.preventDefault();
  
      const datos = {
        //asi es como se recorre la informacion
        //console.log(nameRef.current.value);
        //capturo la inf
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }

      //enviando dato a la funcion login
      login(datos, setErrores)

      //SE MOVIO A "USEAUTH"
  
      // try {
      //   const { data } = await clienteAxios.post('/api/login', datos)
      //   //console.log(data.token);
      //   localStorage.setItem('AUTH_TOKEN', data.token);
      //   setErrores([]);
      // } catch (error) {
      //   //console.log(error);
      //   setErrores(Object.values(error.response.data.errors))
      // }
  
    }


  return (
    <>
      <h1 className="text-4xl font-black">Entra a tu Cuenta</h1>
      <p>Para pedir un pedido debes iniciar sesion</p>

      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form
          onSubmit={ handleSubmit }
          noValidate
        >

          { errores ? errores.map ((error, i) => <Alerta key={ i }>{ error }</Alerta>) : null }

          <div className="mb-4">
            <label className="text-slate-800" htmlFor="email">Email</label>
            <input
              type="email"
              className="mt-2 w-full p-3 bg-gray-50"
              name="email"
              id="email"
              placeholder="Tu Correo"
              ref={ emailRef }
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
              ref={ passwordRef }
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
