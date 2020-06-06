import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native'
import {
    Container,
    Text,
    H1,
    H3,
    Button,
    Footer,
    FooterTab
} from 'native-base';

import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';
//Context 
import PedidosContext from '../context/pedidos/PedidosContext';
import firebase from '../firebase';
import Countdown from 'react-countdown';

const ProcesoPedido = () => {

    const { pedido_id } = useContext(PedidosContext);
    const navegation = useNavigation();
    const [tiempo, guardarTiempo] = useState(0);
    const [completado, guardarCompletado] = useState(false);


    useEffect(() => {
        const obtenerProducto = () => {
            firebase.db.settings({ experimentalForceLongPolling: true});
            firebase.db.collection('ordenes')
                .doc(pedido_id)
                .onSnapshot(function (doc) {
                    guardarTiempo(doc.data().tiempoentrega);
                    guardarCompletado(doc.data().completado);
                })
        }
        obtenerProducto();

    }, []);


    const renderC = ({ minutes, seconds }) => {

        return (
            <Text style={styles.tiempo}>{minutes}: {seconds}</Text>
        )
    }

    return (
        <Container style={globalStyles.contenedor}>
            <View style={[globalStyles.contenido, { marginTop: 50 }]}>
                {tiempo === 0 && (
                    <>
                        <Text style={{ textAlign: "center" }}>Hemos recibido tu orden....</Text>
                        <Text style={{ textAlign: "center" }}>Calculando tiempo de entrega</Text>
                    </>
                )}

                {!completado && tiempo > 0 && (
                    <>
                        <Text style={{ textAlign: "center" }}>Su orden estara lista en:</Text>
                        <Text style={{ textAlign: "center" }}>
                            <Countdown
                                date={Date.now() + tiempo * 60000}
                                renderer={renderC}
                            />
                        </Text>
                    </>
                )}

                {completado && (
                    <>
                        <H1 styles={styles.textoCompletado}>Orden Lista</H1>
                        <H3 styles={styles.textoCompletado}>Por Favor Pase a recoger su pedido</H3>
                        <Image style={[globalStyles.imagen, { marginTop: 80 }]} source={{ uri: "https://cdn.xl.thumbs.canstockphoto.es/-dibujo_csp67112095.jpg" }} />
                    </>
                )}

                <Footer>
                    <FooterTab>
                        <Button style={globalStyles.boton}
                            onPress= {() => navegation.navigate('Nueva Orden')}
                        >
                            <Text style={globalStyles.botonTexto}>Comenzar una Orden Nueva</Text>
                        </Button>
                    </FooterTab>
                </Footer>

            </View>
        </Container>
    );

}

const styles = StyleSheet.create({
    tiempo: {
        marginBottom: 20,
        fontSize: 60,
        textAlign: "center",
        marginTop: 30,
    },
    textoCompletado: {
        textAlign: "center",
        textTransform: "uppercase",
        marginBottom: 20
    }
});

export default ProcesoPedido;