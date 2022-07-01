import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { Modal } from "../components/Popup";

const MenuScreen = ({ navigation }) => {
  const [importVisible, setImportVisible] = useState(false);

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
    </SafeAreaView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
});
