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
import { obtenerParametro } from "../utils/";
import { FontAwesome5 } from "@expo/vector-icons";
import InputSpinner from "react-native-input-spinner";
import { Picker } from "@react-native-picker/picker";

const Insercion = () => {
  const [already, setAlready] = useState(false);
  const [formsVisible, setFormsVisible] = useState(false);
  const [cantidadPersonas, setCantidadPersonas] = useState(1);
  const [cantidadMaterialesDirectos, setCantidadMaterialesDirectos] =
    useState(1);
  const [cantidadMaterialesIndirectos, setCantidadMaterialesIndirectos] =
    useState(1);
  const [insertedData, setInsertedData] = useState({
    personas: [],
    mDirectos: [],
    mIndirectos: [],
  });

  const handleModal = () => setFormsVisible(() => !formsVisible);

  useEffect(() => {
    obtenerParametro("insertedData").then((data) => {
      if (data) {
        setInsertedData(data);
        setAlready(true);
      }
    });
    if (!already) {
      setFormsVisible(true);
    }
  });

  const PersonasFields = (i) => {
    if (i <= 0) {
      setCantidadPersonas(1);
      i = 1;
    }
    let personas = [];
    for (let j = 1; j <= i; j++) {
      personas.push(
        <TextInput
          key={j}
          style={styles.input}
          placeholder={`Ingrese los Nombres de la Persona ${j}`}
          placeholderTextColor={"gray"}
        />
      );
    }
    return personas;
  };

  const materialesDirectosFields = (i) => {
    if (i <= 0) {
      setCantidadMaterialesDirectos(1);
      i = 1;
    }
    let materiales = [];
    for (let j = 1; j <= i; j++) {
      materiales.push(
        <View style={styles.rowView}>
          <TextInput
            key={j}
            style={styles.inputMaterial}
            placeholder={`Nombre del Material ${j}`}
            placeholderTextColor={"gray"}
          />
          <InputSpinner
            key={j}
            max={100}
            min={0}
            step={1}
            colorMax={"#f04048"}
            colorMin={"#40c5f4"}
            height={40}
            width={100}
            onChange={(num) => {
              console.log(num);
            }}
            style={{ marginHorizontal: 10 }}
            buttonStyle={{ width: 20, height: 20 }}
          />
          <Picker
            key={j}
            onValueChange={(itemValue, itemIndex) => console.log(itemValue)}
          >
            <Picker.Item label="Litros (l)" value="java" />
            <Picker.Item label="Gramos" value="js" />
            <Picker.Item label="Unidades" value="js" />
          </Picker>
        </View>
      );
    }
    return materiales;
  };
  const materialesIndirectosFields = (i) => {
    if (i <= 0) {
      setCantidadMaterialesIndirectos(1);
      i = 1;
    }
    let materiales = [];
    for (let j = 1; j <= i; j++) {
      materiales.push(
        <View style={styles.rowView}>
          <TextInput
            key={j}
            style={styles.inputMaterial}
            placeholder={`Nombre del Material ${j}`}
            placeholderTextColor={"gray"}
          />
          <InputSpinner
            key={j}
            max={100}
            min={0}
            step={1}
            colorMax={"#f04048"}
            colorMin={"#40c5f4"}
            height={40}
            width={100}
            onChange={(num) => {
              console.log(num);
            }}
            style={{ marginHorizontal: 10 }}
            buttonStyle={{ width: 20, height: 20 }}
          />
          <Picker
            key={j}
            onValueChange={(itemValue, itemIndex) => console.log(itemValue)}
          >
            <Picker.Item label="Litros (l)" value="java" />
            <Picker.Item label="Gramos" value="js" />
            <Picker.Item label="Unidades" value="s" />
          </Picker>
        </View>
      );
    }
    return materiales;
  };

  return (
    <View>
      <Modal isVisible={formsVisible}>
        <Modal.Container>
          <Modal.Header title="Ingrese Datos del Proceso" />
          <Modal.Body>
            <View style={{ margin: 20 }}>
              <Text style={styles.text}>Nombre del Producto</Text>
              <TextInput
                style={styles.input}
                placeholder={"Ingrese el Nombre del Producto"}
                placeholderTextColor={"gray"}
              />
            </View>
            <View style={{ margin: 20 }}>
              <View style={styles.rowView}>
                <TouchableOpacity
                  style={styles.buttonAD}
                  onPress={() => {
                    setCantidadPersonas(cantidadPersonas - 1);
                  }}
                >
                  <FontAwesome5 name="minus" size={20} color="black" />
                </TouchableOpacity>
                <Text style={styles.text}>Personas Involucradas</Text>{" "}
                <TouchableOpacity
                  style={styles.buttonAD}
                  onPress={() => {
                    setCantidadPersonas(cantidadPersonas + 1);
                  }}
                >
                  <FontAwesome5 name="plus" size={20} color="black" />
                </TouchableOpacity>
              </View>
              {PersonasFields(cantidadPersonas)}
            </View>
            <View style={{ margin: 20 }}>
              <View style={styles.rowView}>
                <TouchableOpacity
                  style={styles.buttonAD}
                  onPress={() => {
                    setCantidadMaterialesDirectos(
                      cantidadMaterialesDirectos - 1
                    );
                  }}
                >
                  <FontAwesome5 name="minus" size={20} color="black" />
                </TouchableOpacity>
                <Text style={styles.text}>Materiales Directos</Text>
                <TouchableOpacity
                  style={styles.buttonAD}
                  onPress={() => {
                    setCantidadMaterialesDirectos(
                      cantidadMaterialesDirectos + 1
                    );
                  }}
                >
                  <FontAwesome5 name="plus" size={20} color="black" />
                </TouchableOpacity>
              </View>
              <View>
                {materialesDirectosFields(cantidadMaterialesDirectos)}
              </View>
            </View>
            <View style={{ margin: 20 }}>
              <View style={styles.rowView}>
                <TouchableOpacity
                  style={styles.buttonAD}
                  onPress={() => {
                    setCantidadMaterialesIndirectos(
                      cantidadMaterialesIndirectos - 1
                    );
                  }}
                >
                  <FontAwesome5 name="minus" size={20} color="black" />
                </TouchableOpacity>
                <Text style={styles.text}>Materiales Indirectos</Text>
                <TouchableOpacity
                  style={styles.buttonAD}
                  onPress={() => {
                    setCantidadMaterialesIndirectos(
                      cantidadMaterialesIndirectos + 1
                    );
                  }}
                >
                  <FontAwesome5 name="plus" size={20} color="black" />
                </TouchableOpacity>
              </View>
              <View>
                {materialesIndirectosFields(cantidadMaterialesIndirectos)}
              </View>
              <View>
                <Text style={styles.text}>Utilidad que desea generar</Text>
                <TextInput
                  style={styles.input}
                  placeholder={"Ingrese el Porcentaje de Utilidad"}
                  keyboardType={"numeric"}
                  placeholderTextColor={"gray"}
                />
              </View>
            </View>
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
    width: 300,
    borderColor: "black",
    alignSelf: "center",
    height: 40,
    borderRadius: 50,
    paddingRight: 10,
    paddingLeft: 10,
  },
  buttonAD: {
    borderRadius: 50,
    alignSelf: "center",
    marginHorizontal: 10,
  },
  rowView: {
    flexDirection: "row",
    alignSelf: "center",
  },
  inputMaterial: {
    width: 300,
    borderColor: "black",
    alignSelf: "center",
    height: 40,
    borderRadius: 50,
    paddingRight: 10,
    paddingLeft: 10,
  },
});
