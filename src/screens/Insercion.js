import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Modal } from "../components/Popup";

const Insercion = () => {
  const [already, setAlready] = useState(false);
  const [formsVisible, setFormsVisible] = useState(false);
  const [insertedData, setInsertedData] = useState({});

  const handleModal = () => setFormsVisible(() => !formsVisible);

  useEffect(() => {
    if (!already) {
      setFormsVisible(true);
    }
  });
  return (
    <View>
      <Modal isVisible={formsVisible}>
        <Modal.Container>
          <Modal.Header title="Ingrese Nombre del Producto" />
          <Modal.Body>
            <TextInput
              style={styles.input}
              placeholder={"Nombre del Producto"}
              placeholderTextColor={"gray"}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button title="Cancelar" onPress={handleModal} />
          </Modal.Footer>
        </Modal.Container>
      </Modal>
      <Text>Insercion</Text>
    </View>
  );
};

export default Insercion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    width: 500,
    borderColor: "black",
    alignSelf: "center",
    height: 40,
    borderRadius: 50,
    paddingRight: 10,
    paddingLeft: 10,
  },
});
