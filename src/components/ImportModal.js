import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ImportModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" style={styles.modal}>
      <View style={styles.container}>
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
            onClose();
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
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: "50%",
  },
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
    color: "white",
    fontSize: 20,
  },
});

export default ImportModal;
