import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Insercion from "./src/screens/Insercion";
import Menu from "./src/screens/Menu";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            title: "Fericonomia - Inicio",
          }}
        />
        <Stack.Screen
          name="Insercion"
          component={Insercion}
          options={{ title: "Fericonomia - Inserción de Producto" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
