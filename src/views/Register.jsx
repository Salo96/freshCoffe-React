import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import { clienteAxios } from "../config/axios";

export const Register = () => {


  //createRef-> lee lo que ingresmos en el formulario de registro en los campo
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();

  const handleSubmit = async e => {
    e.preventDefault();

    const datos = {
      //asi es como se recorre
      //console.log(nameRef.current.value);
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }

    try {
      //console.log(datos);
      const resp = await clienteAxios.post('/api/registro', datos)
      console.log(resp);
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
      <h1 className="text-4xl font-black">Crea Tu Cuenta</h1>
      <p>Crea tu Cuenta llenando el formulario</p>

      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form
          onSubmit={ handleSubmit }
        >
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="name">Nombre</label>
            <input 
              type="text" 
              className="mt-2 w-full p-3 bg-gray-50"
              name="name" 
              id="name" 
              placeholder="Tu Nombre"
              ref={ nameRef }
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

          <div className="mb-4">
            <label className="text-slate-800" htmlFor="password_confirmation">Repetir Password</label>
            <input 
              type="password" 
              className="mt-2 w-full p-3 bg-gray-50"
              name="password_confirmation" 
              id="password_confirmation" 
              placeholder="Repetir Contraseña"
              ref={ passwordConfirmationRef }
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
