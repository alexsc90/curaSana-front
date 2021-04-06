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

export default (state, action) => {
    switch(action.type){

        case LOGIN_EXITOSO:
        case REGISTRO_EXITOSO:
            localStorage.setItem('token', action.payload.token)

            return{
                ...state,
                autenticado: true,
                mensaje: null
            }
        
        case AGREGAR_PEDIDO:
            return {
                ...state,
                usuario: action.payload
            }

        case ACTUALIZAR_USUARIO:
            return {
                ...state,
                usuario: action.payload
            }

        case ELIMINAR_USUARIO:
            localStorage.removeItem('token')
            return {
                ...state,
                usuario: null,
                autenticado: null
            }
 
        case CERRAR_SESION:
        case LOGIN_ERROR:    
        case REGISTRO_ERROR:
            localStorage.removeItem('token')
            
            return {
                ...state,
                token: null,
                usuario: null,
                autenticado: null,
                mensaje: action.payload,
                cargando: false
            }

        case OBTENER_USUARIO:
            return{
                ...state,
                autenticado: true,
                usuario: action.payload
            }

        default:
            return state
    }
}