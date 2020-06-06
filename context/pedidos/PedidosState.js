import React, { useReducer, useContext } from 'react';

import PedidosContext from './PedidosContext';
import PedidosReducer from './PedidosReducer';

//tYPE 
import {
    SELECCIONAR_PRODUCTO,
    CONFIRMAR_ORDENAR_PLATILLO,
    MOSTRAR_RESUMEN,
    ELIMINAR_PRODUCTO,
    PEDIDO_ORDENADO

} from '../../types';
const PedidoState = props => {


    //Crear State inicial 
    const initialState = {
        platillo: null,
        pedido: [],
        total: 0,
        pedido_id: '',
    }

    //use Reducer para ejecutar las funciones 

    const [state, dispath] = useReducer(PedidosReducer, initialState);

    //Seleccionar el Prodcuto
    const seleccionarPlatillo = platillo => {
        dispath({
            type: SELECCIONAR_PRODUCTO,
            payload: platillo
        })
    }

    //Cuando el usuario confirma un platillo 
    const guardarPedido = pedido => {
        dispath({
            type: CONFIRMAR_ORDENAR_PLATILLO,
            payload: pedido
        })
    }

    //Funcion muestra el total a pagar en el resumen 
    const mostrarResumen = total => {
        dispath({
            type: MOSTRAR_RESUMEN,
            payload: total
        })
    }

    //Elimina un pedido del state 
    const eliminarPedido = id => {
        dispath({
            type:ELIMINAR_PRODUCTO,
            payload: id
        })
    }

    //PEDIDO REALIZADO 

    const pedidoRealizado = id => {
        dispath({
            type:PEDIDO_ORDENADO,
            payload: id
        });

    }


    return (
        <PedidosContext.Provider
            value={{
                //State 
                pedido: state.pedido,
                platillo: state.platillo,
                total: state.total,
                pedido_id: state.pedido_id,

                //Funciones
                seleccionarPlatillo,
                guardarPedido,
                mostrarResumen,
                eliminarPedido,
                pedidoRealizado
            }}
        >
            {props.children}
        </PedidosContext.Provider>
    )
}

export default PedidoState;
