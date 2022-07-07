import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Modal } from "../components/Popup";
import { obtenerParametro, anadirParametro } from "../utils/";
import { FontAwesome5 } from "@expo/vector-icons";
import InputSpinner from "react-native-input-spinner";
import { Picker } from "@react-native-picker/picker";

const Insercion = ({ navigation }) => {
  const [already, setAlready] = useState(false);
  const [formsVisible, setFormsVisible] = useState(false);
  const [cantidadPersonas, setCantidadPersonas] = useState(1);
  const [cantidadMaterialesDirectos, setCantidadMaterialesDirectos] =
    useState(1);
  const [cantidadMaterialesIndirectos, setCantidadMaterialesIndirectos] =
    useState(1);
  const [insertedData, setInsertedData] = useState({
    nombreProducto: "",
    personas: [],
    mDirectos: [
      {
        nombre: "",
        cantidad: 0,
        unidad: "",
        precio: 0,
      },
    ],
    mIndirectos: [],
    porcentajeUtil: 0,
  });

  useEffect(() => {
    (async () => {
      const inserted = await obtenerParametro("insertedData");
      console.log(inserted);
      if (inserted) {
        setInsertedData(inserted);
        setAlready(true);
      }
      if (!already) {
        setFormsVisible(true);
      }
    })();
  }, []);

  const PersonasFields = (i) => {
    if (i <= 0) {
      setCantidadPersonas(1);
      i = 1;
    }
    let personas = [];
    for (let j = 1; j <= i; j++) {
      personas.push(
        <TextInput
          key={`ti-${j}-persona`}
          style={styles.input}
          placeholder={`Ingrese los Nombres de la Persona ${j}`}
          placeholderTextColor={"gray"}
          onChangeText={(text) => {
            let personas = insertedData.personas;
            personas[j - 1] = text;
            setInsertedData({ ...insertedData, personas });
          }}
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
    let materialesDir = insertedData.mDirectos;

    for (let j = 1; j <= i; j++) {
      materiales.push(
        <View style={styles.rowView}>
          <TextInput
            key={`ti-${j}-mDirecto`}
            style={styles.inputMaterial}
            placeholder={`Nombre del Material ${j}`}
            placeholderTextColor={"gray"}
            onChangeText={(text) => {
              try {
                materialesDir[j - 1].nombre = text;
                setInsertedData({ ...insertedData, mDirectos: materialesDir });
              } catch {
                materialesDir.push({
                  nombre: text,
                  cantidad: 0,
                  unidad: "",
                  precio: 0,
                });
                setInsertedData({ ...insertedData, mDirectos: materialesDir });
              }
            }}
          />
          <InputSpinner
            key={`is-${j}-mDirecto`}
            max={1000}
            min={1}
            step={0.1}
            colorMax={"#f04048"}
            colorMin={"#40c5f4"}
            height={40}
            width={100}
            style={{ marginHorizontal: 10 }}
            buttonStyle={{ width: 20, height: 20 }}
            onChange={(value) => {
              materialesDir[j - 1].cantidad = value;
              setInsertedData({ ...insertedData, mDirectos: materialesDir });
            }}
          />
          <Picker
            key={`p-${j}-mDirecto`}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => {
              materialesDir[j - 1].unidad = itemValue;
              setInsertedData({ ...insertedData, mDirectos: materialesDir });
            }}
          >
            <Picker.Item label="Litros (l)" value="l" />
            <Picker.Item label="Gramos (g)" value="g" />
            <Picker.Item label="Unidades" value="u" />
            <Picker.Item label="Libras (lb)" value="lb" />
            <Picker.Item label="Kilos (kg)" value="kg" />
            <Picker.Item label="Cm3 (cm3)" value="cm3" />
          </Picker>
          <TextInput
            key={`ti2-${j}-mDirecto`}
            style={styles.inputMaterial}
            placeholder={`Precio del material ${j}`}
            placeholderTextColor={"gray"}
            onChangeText={(text) => {
              materialesDir[j - 1].precio = text;
              setInsertedData({ ...insertedData, mDirectos: materialesDir });
            }}
          />
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
    let materialesInd = insertedData.mIndirectos;
    for (let j = 1; j <= i; j++) {
      materiales.push(
        <View style={styles.rowView}>
          <TextInput
            key={`ti-${j}-mIndirecto`}
            style={styles.inputMaterial}
            placeholder={`Nombre del Material ${j}`}
            placeholderTextColor={"gray"}
            onChangeText={(text) => {
              try {
                materialesInd[j - 1].nombre = text;
                setInsertedData({
                  ...insertedData,
                  mIndirectos: materialesInd,
                });
              } catch {
                materialesInd.push({
                  nombre: text,
                  cantidad: 0,
                  unidad: "",
                  precio: 0,
                });
                setInsertedData({
                  ...insertedData,
                  mIndirectos: materialesInd,
                });
              }
            }}
          />
          <InputSpinner
            key={`is-${j}-mIndirecto`}
            max={100}
            min={0}
            step={1}
            colorMax={"#f04048"}
            colorMin={"#40c5f4"}
            height={40}
            width={100}
            style={{ marginHorizontal: 10 }}
            buttonStyle={{ width: 20, height: 20 }}
            onChange={(value) => {
              materialesInd[j - 1].cantidad = value;
              setInsertedData({ ...insertedData, mIndirectos: materialesInd });
            }}
          />
          <Picker
            key={`p-${j}-mIndirecto`}
            onValueChange={(itemValue, itemIndex) => {
              materialesInd[j - 1].unidad = itemValue;
              setInsertedData({ ...insertedData, mIndirectos: materialesInd });
            }}
          >
            <Picker.Item label="Litros (l)" value="l" />
            <Picker.Item label="Gramos (g)" value="g" />
            <Picker.Item label="Unidades" value="u" />
            <Picker.Item label="Libras (lb)" value="lb" />
            <Picker.Item label="Kilos (kg)" value="kg" />
            <Picker.Item label="Cm3 (cm3)" value="cm3" />
          </Picker>
          <TextInput
            key={`ti2-${j}-mIndirecto`}
            style={styles.inputMaterial}
            placeholder={`Precio del material ${j}`}
            placeholderTextColor={"gray"}
            onChangeText={(text) => {
              materialesInd[j - 1].precio = text;
              setInsertedData({ ...insertedData, mIndirectos: materialesInd });
            }}
          />
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
                onChangeText={(text) => {
                  setInsertedData({ ...insertedData, nombreProducto: text });
                }}
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
                  <Text>
                    <FontAwesome5 name="minus" size={20} color="black" />
                  </Text>
                </TouchableOpacity>
                <Text style={styles.text}>Recursos Humanos</Text>
                <TouchableOpacity
                  style={styles.buttonAD}
                  onPress={() => {
                    setCantidadPersonas(cantidadPersonas + 1);
                  }}
                >
                  <Text>
                    <FontAwesome5 name="plus" size={20} color="black" />
                  </Text>
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
                  <Text>
                    <FontAwesome5 name="minus" size={20} color="black" />
                  </Text>
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
                  <Text>
                    <FontAwesome5 name="plus" size={20} color="black" />
                  </Text>
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
                  <Text>
                    <FontAwesome5 name="minus" size={20} color="black" />
                  </Text>
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
                  <Text>
                    <FontAwesome5 name="plus" size={20} color="black" />
                  </Text>
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
                  onChangeText={(text) => {
                    setInsertedData({
                      ...insertedData,
                      porcentajeUtil: text,
                    });
                  }}
                />
              </View>
            </View>
          </Modal.Body>
          <Modal.Footer>
            <View style={styles.rowView}>
              <TouchableOpacity
                style={styles.buttonCancel}
                onPress={() => setFormsVisible(false)}
              >
                <Text style={styles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setFormsVisible(false);
                  alert("Proceso Creado");
                  alert(JSON.stringify(insertedData));
                  anadirParametro("insertedData", insertedData);
                }}
              >
                <Text style={styles.buttonText}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </Modal.Footer>
        </Modal.Container>
      </Modal>
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
  buttonText: {
    color: "white",
    fontSize: 20,
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
  buttonCancel: {
    borderRadius: 50,
    alignSelf: "center",
    marginHorizontal: 10,
    width: 100,
    alignItems: "center",
    backgroundColor: "red",
  },
  button: {
    borderRadius: 50,
    alignSelf: "center",
    width: 100,
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: "green",
  },
});
