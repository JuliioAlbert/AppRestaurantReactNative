import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';

//Navegacion 
import { useNavigation } from '@react-navigation/native';
//Context 
import PedidosContext from '../context/pedidos/PedidosContext';

//Native Base 
import {
    Container,
    Content,
    Form,
    Icon,
    Input,
    Grid,
    Col,
    Button,
    Text,
    Footer,
    FooterTab
} from 'native-base';

import globalStyles from '../styles/global';



const FormularioPlatillo = () => {

    //Nanevacion 
    const navigation = useNavigation();

    //Context pedidos 
    const { platillo, guardarPedido } = useContext(PedidosContext);
    const { precio } = platillo;


    //State para cantidades 
    const [cantidad, guardarCantidad] = useState(1);
    const [total, gurdarTotal] = useState(0);

    //Calcula el total del platillo por su cantidad 
    const calcularTotal = () => {
        const totalPagar = precio * cantidad;
        gurdarTotal(totalPagar);
    }

    //Cuando Cargar Por Primera vez y los cambios de estado
    useEffect(() => {
        calcularTotal();
    }, [cantidad])

    //Decrementar 
    const decrementar = () => {
        if (cantidad > 1) {
            const nuevaCantidad = parseInt(cantidad) - 1;
            guardarCantidad(nuevaCantidad);
        }
    }

    //Incrementa 
    const incrementar = () => {
        const nuevaCantidad = parseInt(cantidad) + 1;
        guardarCantidad(nuevaCantidad);
    }
    //Confirmar 
    const confirmarOrden = () => {
        Alert.alert(
            '¿Deseas Confirmar tu Pedido',
            'Pedido Confirmado',
            [
                {

                    text: 'Confirmar',
                    onPress: () => {
                        //almacenar el pedido Principal
                        const pedido = {
                            ...platillo,
                            cantidad,
                            total
                        }
                        guardarPedido(pedido);
                        //Navegar hacia el resumen
                        navigation.navigate('ResumenPedido')

                    }
                },
                {
                    text: 'Cancelar',
                    style: 'cancel'
                }
            ]
        )
    }


    return (
        <Container>
            <Content>
                <Form>
                    <Text style={globalStyles.cantidad}>Cantidad</Text>
                    <Grid>
                        <Col>
                            <Button
                                props
                                style={{ height: 80, justifyContent: "center", backgroundColor: "#90e773" }}
                                onPress={() => decrementar()}
                            >
                                <Icon style={{ fontSize: 40 }} name="remove" />

                            </Button>
                        </Col>

                        <Col>
                            <Input
                                style={{ textAlign: "center", fontSize: 20 }}
                                value={cantidad.toString()}
                                keyboardType="numeric"
                                onChangeText={cantidad => guardarCantidad(cantidad)}
                            />
                        </Col>
                        <Col>
                            <Button
                                props
                                style={{ height: 80, justifyContent: "center", backgroundColor: "#90e773" }}
                                onPress={() => incrementar()}
                            >
                                <Icon style={{ fontSize: 40 }} name="add" />
                            </Button>
                        </Col>

                    </Grid>
                    <Text style={globalStyles.cantidad}>Subtotal: $ {total} </Text>

                </Form>
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                        style={globalStyles.boton}
                        onPress={() => confirmarOrden()}
                    >
                        <Text style={globalStyles.botonTexto}>Agregar al Pedido</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
}

export default FormularioPlatillo;