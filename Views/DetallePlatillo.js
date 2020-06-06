import React, { useContext } from 'react';
import { Image } from 'react-native'

//Navegacion 
import { useNavigation } from '@react-navigation/native';
//Context 
import PedidosContext from '../context/pedidos/PedidosContext';

//Native Base 
import {
    Container,
    Content,
    Footer,
    FooterTab,
    Button,
    Body,
    Text,
    H1,
    Card,
    CardItem
} from 'native-base';

import globalStyles from '../styles/global';


const DetallePlatillo = () => {

    //Redireccionar 
    const navigation = useNavigation();

    const { platillo } = useContext(PedidosContext);

    const { nombre, imagen, descripcion, precio } = platillo;

    return (
        <Container style={globalStyles.contenedor}>
            <Content style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>{nombre}</H1>

                <Card>
                    <CardItem>
                        <Body>
                            <Image style={globalStyles.imagen} source={{ uri: imagen }} />
                            <Text style={{ marginTop: 20 }}>{descripcion}</Text>
                            <Text style={globalStyles.cantidad}>Precio: ${precio}</Text>
                        </Body>
                    </CardItem>
                </Card>
            </Content>

            <Footer>
                <FooterTab>
                    <Button
                        style={globalStyles.boton}
                        onPress={() => navigation.navigate('FormularioPlatillo')}
                    >
                        <Text style={globalStyles.botonTexto}>Ordenar</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
}

export default DetallePlatillo;