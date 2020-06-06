import React, { useContext, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';

//Navegacion 
import { useNavigation } from '@react-navigation/native';
//Context 
import PedidosContext from '../context/pedidos/PedidosContext';

//importar firebase
import firebase from '../firebase';

//Native Base 
import {
    Container,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Left,
    Body,
    Button,
    H1,
    Footer,
    FooterTab
} from 'native-base';

//Styles Globales
import globalStyles from '../styles/global';



const ResumenPedido = () => {

    const navigation = useNavigation();

    //State de Pedidos
    const { pedido, total, mostrarResumen, eliminarPedido, pedidoRealizado } = useContext(PedidosContext);

    useEffect(() => {
        calcularTotal();
    }, [pedido]);

    const calcularTotal = () => {
        let nuevoTotal = 0;
        nuevoTotal = pedido.reduce((nuevoTotal, articulo) => nuevoTotal + articulo.total, 0)
        mostrarResumen(nuevoTotal);
    }

    //Redireccionar a Progreso Pedido
    const progresoPedido = () => {

        Alert.alert(
            'Revisa tu orden',
            'Orden confirmada',
            [
                {
                    text: 'Confirmar',
                    onPress:  async() => {

                        //crear un objeto
                        const pedidoObj = {
                            tiempoentrega: 0,
                            completado: false,
                            total: Number(total),
                            orden: pedido,
                            creado: Date.now()
                        }



                        //escribir el pedido en firebase 
                        try {
                            firebase.db.settings({ experimentalForceLongPolling: true });
                            const pedido =  await firebase.db.collection('ordenes').add(pedidoObj);
                            pedidoRealizado(pedido.id);
                            navigation.navigate('ProcesoPedido');
                        } catch (error) {
                            console.log(error);
                        }



                    }
                }, {
                    text: 'Revisar',
                    style: "cancel"
                }
            ]
        )
    }

    //Elimina un producto del arreglo de producto
    const confirmarEliminacion = id => {
        Alert.alert(
            '¿Deseas Eliminar?',
            'Eliminado',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        //Eliminar del state
                        eliminarPedido(id);
                    }
                }, {
                    text: 'Cancelar',
                    style: "cancel"
                }
            ]
        )
    }

    return (
        <Container style={globalStyles.contenedor}>
            <Content style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>Carrito</H1>
                {pedido.map((platillo, i) => {
                    const { cantidad, nombre, imagen, id, precio } = platillo;
                    return (
                        <List key={id + i}>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail large square source={{ uri: imagen }} />
                                </Left>
                                <Body>
                                    <Text>{nombre}</Text>
                                    <Text>Cantidad: {cantidad}</Text>
                                    <Text>Precio:  ${precio}</Text>
                                    <Button
                                        onPress={() => confirmarEliminacion(id)}
                                        full
                                        danger
                                        style={{ marginTop: 20, borderRadius: 20 }}
                                    >
                                        <Text >Eliminar</Text>
                                    </Button>
                                </Body>
                            </ListItem>
                        </List>
                    )
                })}
                <Text style={globalStyles.cantidad}>Total a Pagar: ${total} </Text>

                <Button
                    onPress={() => navigation.navigate('Menu')}
                    full
                    style={{ backgroundColor: '#33ff77', borderRadius: 20 }}>
                    <Text style={[globalStyles.botonTexto, { fontWeight: "bold" }]}>Seguir Pidiendo</Text>
                </Button>
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                        onPress={() => progresoPedido()}
                        full
                        style={[globalStyles.boton]}>
                        <Text style={[globalStyles.botonTexto, { fontWeight: "bold" }]}>Ordenar</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
}

export default ResumenPedido;