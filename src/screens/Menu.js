import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import ImportModal from "../components/ImportModal";

const MenuScreen = ({ navigation }) => {
  const [importVisible, setImportVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ImportModal
        visible={importVisible}
        onClose={() => setImportVisible(false)}
      />
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
      {}
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
