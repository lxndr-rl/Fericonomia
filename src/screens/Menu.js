import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { Modal } from "../components/Popup";
const Width =
  Platform.OS == "web"
    ? Dimensions.get("window").width < 800
      ? Dimensions.get("window").width
      : Dimensions.get("window").width / 2.5
    : Dimensions.get("window").width;

const MenuScreen = ({ navigation }) => {
  const [importVisible, setImportVisible] = useState(false);

  useEffect(() => {
    (async () => {
      if (!sessionStorage.getItem("valorWattHora")) {
        sessionStorage.setItem("valorWattHora", 0.05);
      }
      if (!sessionStorage.getItem("valorAguaLitro")) {
        sessionStorage.setItem("valorAguaLitro", 0.05);
      }
      if (!sessionStorage.getItem("sueldoMin")) {
        sessionStorage.setItem("sueldoMin", 0.05);
      }
    })();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Modal isVisible={importVisible}>
        <Modal.Container>
          <Modal.Header title="Importar Datos Previos" />
          <Modal.Body>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                alert(true);
              }}
            >
              <LinearGradient
                colors={["#11998e", "#38ef7d"]}
                start={[0, 1]}
                end={[1, 0]}
                style={styles.button}
              >
                <Text style={styles.text}>
                  {<FontAwesome5 name="file-import" size={20} color="white" />}{" "}
                  Seleccionar Archivo
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setImportVisible(false);
              }}
            >
              <LinearGradient
                colors={["#FF416C", "#FF4B2B"]}
                start={[0, 1]}
                end={[1, 0]}
                style={styles.button}
              >
                <Text style={styles.text}>
                  {<FontAwesome5 name="window-close" size={20} color="white" />}{" "}
                  Cerrar
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Modal.Body>
          <Modal.Footer>
            <TouchableOpacity
              title="Cancelar"
              onPress={() => setImportVisible(false)}
            />
          </Modal.Footer>
        </Modal.Container>
      </Modal>

      <View style={styles.rectangle}>
        <View style={styles.mvContainer}>
          <Text style={styles.mvText}>
            PROCESO DE CÁLCULO DE COSTOS PARA LA ELABORACIÓN DE PRODUCTOS
          </Text>
        </View>
        <Image source={require("../assets/logo.jpg")} style={styles.tinyLogo} />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Insercion");
        }}
      >
        <LinearGradient
          colors={["#11998e", "#38ef7d"]}
          start={[0, 1]}
          end={[1, 0]}
          style={styles.button}
        >
          <Text style={styles.text}>
            {<FontAwesome5 name="plus" size={20} color="white" />} Insertar
            Datos
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      {false && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setImportVisible(true);
          }}
        >
          <LinearGradient
            colors={["#4ECDC4", "#556270"]}
            start={[0, 1]}
            end={[1, 0]}
            style={styles.button}
          >
            <Text style={styles.text}>
              {<FontAwesome5 name="file-import" size={20} color="white" />}{" "}
              Importar Datos
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#a5eea0",
  },
  button: {
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "center",
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 30,
    color: "white",
  },
  rectangle: {
    margin: 7,
    borderRadius: 20,
    borderColor: "transparent",
    borderWidth: 2,
    width: Width - 10,
    padding: 20,
    alignSelf: "center",
  },
  mvContainer: {
    marginTop: 20,
    marginVertical: 15,
    borderRadius: 10,
  },
  mvText: {
    color: "#000",
    textAlign: "center",
    width: Width - 40,
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 10,
  },
  tinyLogo: {
    width: 200,
    height: 200,
    padding: 20,
    margin: 20,
    alignSelf: "center",
    borderRadius: "50%",
  },
});
