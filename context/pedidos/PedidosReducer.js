import {
    SELECCIONAR_PRODUCTO,
    CONFIRMAR_ORDENAR_PLATILLO,
    MOSTRAR_RESUMEN,
    ELIMINAR_PRODUCTO,
    PEDIDO_ORDENADO
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case SELECCIONAR_PRODUCTO:
            return {
                ...state,
                platillo: action.payload
            }
        case CONFIRMAR_ORDENAR_PLATILLO:
            return {
                ...state,
                pedido: [action.payload, ...state.pedido]
            }
        case MOSTRAR_RESUMEN:
            return {
                ...state,
                total: action.payload
            }
        case ELIMINAR_PRODUCTO: {
            return {
                ...state,
                pedido: state.pedido.filter(acticulo => acticulo.id !== action.payload)
            }
        }
        case PEDIDO_ORDENADO:
            return {
                ...state,
                pedido:[],
                total:0,
                pedido_id: action.payload
            }
        default:
            return state;
    }
}