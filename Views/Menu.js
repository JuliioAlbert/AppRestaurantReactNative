import React, { useEffect, useContext, Fragment } from 'react';

import { StyleSheet } from 'react-native'

import { useNavigation } from '@react-navigation/native';
//native base 
import {
    Container,
    Separator,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Body
} from 'native-base';
import globalStyles from '../styles/global';
//Context Firebase para las funciones ;
import FirebaseContext from '../context/firebase/FirebaseContext';
import PedidosContext from '../context/pedidos/PedidosContext';

const Menu = () => {

    const navigation = useNavigation();

    //Context de firebase 
    const { menu, obtenerProductos } = useContext(FirebaseContext);

    //Context Pedidos
    const { seleccionarPlatillo } = useContext(PedidosContext);

    useEffect(() => {
        obtenerProductos();
    }, []);

    const mostrarHeading = (categoria, i) => {

        if (i > 0) {
            const categoriaAnterior = menu[i - 1].categoria;
            if (categoriaAnterior !== categoria) {
                return (
                    <Separator style={styles.separador}>
                        <Text style={styles.separadorText}>{categoria}</Text>
                    </Separator>
                )
            }
        } else {
            return (
                <Separator style={styles.separador}>
                    <Text style={styles.separadorText}>{categoria}</Text>
                </Separator>
            )
        }


    }

    return (
        <Container style={globalStyles.contenedor}>
            <Content style={{ backgroundColor: '#fff' }}>
                <List>
                    {menu.map((platillo, i) => {
                        const { imagen, nombre, precio, descripcion, categoria, id } = platillo;
                        return (
                            <Fragment key={id}>
                                {mostrarHeading(categoria, i)}
                                <ListItem
                                    onPress={() => {
                                        //Eliminar Propiedades
                                        const { existencia, ...platillo2 } = platillo;

                                        seleccionarPlatillo(platillo2);
                                        navigation.navigate('DetallePlatillo');
                                    }}
                                >
                                    <Thumbnail large source={{ uri: imagen }} />
                                    <Body>
                                        <Text>{nombre}</Text>
                                        <Text
                                            note
                                            numberOfLines={3}
                                        >{descripcion}</Text>
                                        <Text>Precio $ {precio}</Text>
                                    </Body>
                                </ListItem>
                            </Fragment>
                        )
                    })}
                </List>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    separador: {
        backgroundColor: '#000'
    },
    separadorText: {
        color: '#90e773',
        fontWeight: "bold",
        textTransform: "uppercase"
    }

});

export default Menu;