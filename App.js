import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Menu } from "./pantallas/Menu"
import { Productos, ProductoVer } from './pantallas/Productos';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={Menu} options={{ title: 'Menú Principal' }} />
        <Stack.Screen name="Productos" component={Productos} />
        <Stack.Screen name="Productos/verProducto" component={ProductoVer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
