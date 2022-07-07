import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text } from "react-native";
import Insercion from "./src/screens/Insercion";
import Menu from "./src/screens/Menu";
import { FontAwesome } from "@expo/vector-icons";
import { TablaCostos } from "./src/components/TablaCostos";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Menu"
          component={TablaCostos}
          options={{
            title: "Fericonomia - Inicio",
          }}
        />
        <Stack.Screen
          name="Insercion"
          component={Insercion}
          options={{
            title: "Fericonomia - Inserción de Producto",
            headerRight: () => (
              <TouchableOpacity>
                <Text
                  style={{ fontWeight: "700", fontSize: 16, marginRight: 20 }}
                >
                  {<FontAwesome name="gears" size={20} color="black" />}
                  {"\t"}
                  Parametros
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="TablaCostos"
          component={TablaCostos}
          options={{
            title: "Fericonomia - Inserción de Producto",
            headerRight: () => (
              <TouchableOpacity>
                <Text
                  style={{ fontWeight: "700", fontSize: 16, marginRight: 20 }}
                >
                  {<FontAwesome name="gears" size={20} color="black" />}
                  {"\t"}
                  Parámetros
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
