import React, { useContext } from 'react';
import { Button, Icon } from 'native-base';

import globalStyles from '../../styles/global';

//Navegacion 
import { useNavigation } from '@react-navigation/native';
//Context  
import PedidosContext from '../../context/pedidos/PedidosContext';


const BotonResumen = () => {

    //Context 
    const { pedido } = useContext(PedidosContext);

    const navigation = useNavigation();

    if (pedido.length === 0) return null;
    return (
        <Button
            onPress={() => navigation.navigate('ResumenPedido')}
            style={globalStyles.boton}>
            <Icon style={{ fontSize: 30, color: '#000' }} name="cart" />
        </Button>
    );
}

export default BotonResumen;