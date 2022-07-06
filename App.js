import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text } from "react-native";
import Insercion from "./src/screens/Insercion";
import Menu from "./src/screens/Menu";
import { FontAwesome } from "@expo/vector-icons";

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
          options={{
            title: "Fericonomia - Inserción de Producto",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
