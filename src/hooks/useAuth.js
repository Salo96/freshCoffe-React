import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import  useSWR  from "swr";
import { clienteAxios } from "../config/axios";

export const useAuth = ({ middleware, url }) => {

    //el token lo tengo el localstorage, lo capturo
    const token = localStorage.getItem('AUTH_TOKEN');
    const navigate = useNavigate()

    //validar el usuario autenticado
    const { data: user, error, mutate } = useSWR('/api/user', () =>
        clienteAxios('/api/user',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(error =>{
            throw Error(error?.response?.data?.errors)
        })
    )

    //toma la inf del login de datos, setErrores
    const login = async(datos, setErrores) => {
        try {
            const { data } = await clienteAxios.post('/api/login', datos)
            //guardo el token en local storage
            localStorage.setItem('AUTH_TOKEN', data.token);
            //limpio los errores
            setErrores([]);
            await mutate();//revalida antes que de msg de error
            navigate('/auth/login') //redirecciono
        } catch (error) {
            console.log(error);
            setErrores(Object.values(error.response.data.errors))
        }

    }

    const registro = async(datos, setErrores) => {
        try {

            //peticion post en axios
            const { data } = await clienteAxios.post('/api/registro', datos)
            //console.log(data.token);
            
            localStorage.setItem('AUTH_TOKEN', data.token);//guardo el token en local storage
            setErrores([]); //limpio los errores
            await mutate();//revalida antes que de msg de error
          } catch (error) {
      
            setErrores(Object.values(error.response.data.errors))
            
          }

    }

    const logout = async() => {
        try {

            await clienteAxios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            //eliminar token
            localStorage.removeItem('AUTH_TOKEN')
            //revalidar si el usuario y cambiar el valor
            await mutate(undefined)
           
        } catch (error) {
           
            setErrores(Object.values(error?.response?.data?.errors))
        }

    }

    useEffect(() => {
        //usuario autenticado
        if(middleware === "guest" && url && user){
            navigate(url);
        }

        //usuario administrador
        if(middleware === "guest" && user && user.admin){
            navigate('/admin');
        }

        //usuario no administrador
        if(middleware === "admin" && user && !user.admin){
            navigate('/');
        }

        //usuario no autenticado
        if(middleware ==="auth" && error){
            navigate('/auth/login')
        }
    },[user, error])


    // console.log(user);
    // console.log(error);

    return{
        login,
        registro,
        logout,
        user,
        error
    }

}
