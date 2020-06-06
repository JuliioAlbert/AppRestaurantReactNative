import 'react-native-gesture-handler';
import React from 'react';

//Navegacion
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Views
import NuevaOrden from './Views/NuevaOrden';
import DetallePlatillo from './Views/DetallePlatillo';
import FormularioPlatillo from './Views/FormularioPlatillo';
import Menu from './Views/Menu';
import ProcesoPedido from './Views/ProcesoPedido';
import ResumenPedido from './Views/ResumenPedido';
import { StatusBar } from 'react-native';

import BotonResumen from './components/ui/BotonResumen';


//State Context 
import FirebaseState from './context/firebase/FirebaseState';
import PedidoState from './context/pedidos/PedidosState';

import { Base64 } from 'js-base64';

const { encode, decode } = Base64;
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();
const App = () => {
  return (
    <>
      <FirebaseState>
        <PedidoState>
          <NavigationContainer>
            <StatusBar
              hidden={false}
              showHideTransition='slide'
              backgroundColor="#197839"
              barStyle="dark-content"
            />
            <Stack.Navigator

              screenOptions={{
                headerStyle: {
                  backgroundColor: '#197839'
                },
                headerTitleStyle: {
                  fontWeight: 'bold'
                }, headerTitleAlign: "center",
                headerTintColor: '#000'
              }}
            >
              <Stack.Screen
                name="Nueva Orden"
                component={NuevaOrden}
                options={{
                  title: "Nueva Orden"
                }}

              />

              <Stack.Screen
                name="Menu"
                component={Menu}
                options={{
                  title: "Menu",
                  headerRight: props => <BotonResumen/>
                }}
              />
              <Stack.Screen
                name="DetallePlatillo"
                component={DetallePlatillo}
                options={{
                  title: "Detalle Platillo"
                }}
              />
              <Stack.Screen
                name="FormularioPlatillo"
                component={FormularioPlatillo}
                options={{
                  title: "Ordenar Platillo"
                }}
              />
              <Stack.Screen
                name="ResumenPedido"
                component={ResumenPedido}
                options={{
                  title: "Resumen Platillo"
                }}
              />
              <Stack.Screen
                name="ProcesoPedido"
                component={ProcesoPedido}
                options={{
                  title: "Progreso Platillo"
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PedidoState>
      </FirebaseState>
    </>
  );
};


export default App;