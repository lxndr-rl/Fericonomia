import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Image } from "react-native";
import Insercion from "./src/screens/Insercion";
import Menu from "./src/screens/Menu";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator>
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            title: "Inicio",
            headerRight: () => (
              <View>
                <Image
                  source={require("./src/assets/uaeLogo.png")}
                  style={{ width: 50, height: 50, marginRight: 10 }}
                />
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Insercion"
          component={Insercion}
          options={{
            title: "Inserción de Producto",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
