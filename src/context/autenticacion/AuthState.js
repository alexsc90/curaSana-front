import React, {useReducer} from 'react'
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'


import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/token'

import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
    ACTUALIZAR_USUARIO,
    ELIMINAR_USUARIO, 
    AGREGAR_PEDIDO
} from '../../types'


const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null, 
        mensaje: null,  
        cargando: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState)
    
    // Registra un usuario
    const registrarUsuario = async datos => {

        try{
            const respuesta = await clienteAxios.post('/api/signup', datos)
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })

            // OBTENER EL USUARIO
            usuarioAutenticado()

        } catch(error){
            
            const alerta = {
                msg: error.response.data.msg,
                categoria: "alerta-error"
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    // Retorna el usuario autenticado
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token') // LEER EL TOKEN DE LOCAL STORAGE

        if(token) {
            // Función para enviar el token por headers
            tokenAuth(token)
        }

        try {
            const respuesta = await clienteAxios.get('/api/login')

            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })


        } catch(error) {
            dispatch({
                type: LOGIN_ERROR
            })
        }

    }   

    // Cuando el usuario inicia sesión
    const iniciarSesion = async datos => {
        try{
            const respuesta = await clienteAxios.post('/api/login', datos)
            
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })

            usuarioAutenticado()

        } catch(error){
            console.log(error)
            const alerta = {
                msg: error.response.data.msg,
                categoria: "alerta-error"
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }


    // Cierra la sesión del usuario
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    const actualizarUsuario = async (datos, id) => {
        const respuesta = await clienteAxios.put(`/api/profile/${id}`, datos)
        
        dispatch({
            type: ACTUALIZAR_USUARIO,
            payload: respuesta.data.profile
        })
    }

    const eliminarUsuario = async id => {
        await clienteAxios.delete(`/api/profile/${id}`)
        
        dispatch({
            type: ELIMINAR_USUARIO,
            payload: id
        })
    } 

    const agregarPedido = async (producto) => {
        const order = await clienteAxios.put('/api/profile/edit', producto)
        dispatch({
            type: AGREGAR_PEDIDO,
            payload: order.data.profile
        })
    }

    return (
        <AuthContext.Provider value={{
            token: state.token,
            autenticado: state.autenticado,
            usuario: state.usuario,
            mensaje: state.mensaje,
            cargando: state.cargando,
            registrarUsuario,
            iniciarSesion,
            usuarioAutenticado,
            cerrarSesion,
            actualizarUsuario,
            eliminarUsuario,
            agregarPedido
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState