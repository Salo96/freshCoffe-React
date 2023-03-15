import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "./layouts/AdminLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { Layout } from "./layouts/Layout";
import { Inicio } from "./views/Inicio";
import { Login } from "./views/Login";
import { Ordenes } from "./views/Ordenes";
import { Productos } from "./views/Productos";
import { Register } from "./views/Register";

export const router = createBrowserRouter([
    {
        //los padres tiene el outlet
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true, 
                element: <Inicio />
            }
        ]
    },
    {
         //los padres tiene el outlet
        path: '/auth',
        element: <AuthLayout />,
        children:[
            {
                path: '/auth/login',
                element: <Login />
            },
            {
                path:  '/auth/registro',
                element: <Register />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true, 
                element: <Ordenes />
            },
            {
                path: '/admin/productos',
                element: <Productos />
            }
        ]
    }
])
