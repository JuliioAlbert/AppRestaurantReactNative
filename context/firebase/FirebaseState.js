import React, { useReducer } from 'react';

import firebase from '../../firebase';
import FirebaseContext from './FirebaseContext';
import FirebaseReducer from './FirebaseReducer';

//TYPES
import {
    OBTENER_PRODUCTOS_EXITO,
} from '../../types';

//Lodash
import _ from 'lodash';


const FirebaseState = props => {


    //Crear State inicial 
    const initialState = {
        menu: []
    }

    //use Reducer para ejecutar las funciones 

    const [state, dispatch] = useReducer(FirebaseReducer, initialState);

    //Funcion para traer los producto 
    const obtenerProductos = () => {


        //Consultar Firebase
        firebase.db.settings({ experimentalForceLongPolling: true });
        firebase.db
            .collection('productos')
            .where('existencia', '==', true)
            .onSnapshot(manejarSnapshot);

        function manejarSnapshot(snapshot) {
            let platillos = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });


            //Ordenar por categoria
            platillos = _.sortBy(platillos, 'categoria');
            dispatch({
                type: OBTENER_PRODUCTOS_EXITO,
                payload: platillos
            });

        }


    }

    //Cuando el usuario confirma un platillo



    return (
        <FirebaseContext.Provider
            value={{
                //State 
                menu: state.menu,
                firebase,

                //Funciones
                obtenerProductos
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState;
