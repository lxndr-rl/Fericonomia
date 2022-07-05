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
import NumberFormat from "react-number-format";

const Insercion = ({ navigation }) => {
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
    mObraDirecta: [],
    mObraIndirecta: [],
    costosDirectos: [],
    costosIndirectos: [],
  });

  const handleModal = () => {
    setFormsVisible(() => !formsVisible);
    navigation.goBack();
  };

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
      console.log(`${j} Persona`);
      personas.push(
        <TextInput
          key={`ti-${j}-persona`}
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
      console.log(`${j} MaterialDirecto`);
      materiales.push(
        <View>
          <View 
            style={StyleSheet.compose(styles.rowView, { 
              flexDirection: "row",
              justifyContent: "space-around",
            })}
          >
            <TextInput
              key={`ti-${j}-mDirecto`}
              style={StyleSheet.compose(styles.inputMaterial, {
                flexBasis: 240,
                flexGrow: 1,
                flexShrink: 0,
              })}
              placeholder={`Nombre del Material ${j}`}
              placeholderTextColor={"gray"}
            />
            <InputSpinner
              key={`is-${j}-mDirecto-cantidad`}
              max={100}
              min={0}
              step={1}
              type="real"
              precision={2}
              colorMax={"#f04048"}
              colorMin={"#40c5f4"}
              width={90}
              onChange={(num) => {
                console.log(num);
              }}
              buttonStyle={{ width: 20, height: 20 }}
            />
            <Picker
              key={`p-${j}-mDirecto-Unidad`}
              style={{
                width: 90,
              }}
              onValueChange={(itemValue, itemIndex) => console.log(itemValue)}
            >
              <Picker.Item label="Litros (l)" value="java" />
              <Picker.Item label="Gramos" value="js" />
              <Picker.Item label="Unidades" value="js" />
              <Picker.Item label="Libras" value="js" />
              <Picker.Item label="Metros cubicos" value="js" />
            </Picker>
            <NumberFormat
              key={`is-${j}-mDirecto-valor`}
              decimalSeparator="."
              decimalScale={2}
              fixedDecimalScale
              prefix="$ "
              onChange={(event) => {
                console.log(event.target.value);
              }}
              style={{
                width: 90,
                flexBasis: 90,
                flexGrow: 0,
                flexShrink: 0,
                display: "block",
              }}
            />
            <Text style={{
              fontWeight: "bold",
              width: 90,
              flexBasis: 90,
              flexGrow: 0,
              flexShrink: 0,
            }}>
              $ 99.90
            </Text>
          </View>
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
      console.log(`${j} MaterialIndirecto`);
      materiales.push(
        <View style={styles.rowView}>
          <TextInput
            key={`ti-${j}-mIndirecto`}
            style={styles.inputMaterial}
            placeholder={`Nombre del Material ${j}`}
            placeholderTextColor={"gray"}
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
            onChange={(num) => {
              console.log(num);
            }}
            style={{ marginHorizontal: 10 }}
            buttonStyle={{ width: 20, height: 20 }}
          />
          <Picker
            key={`p-${j}-mIndirecto`}
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
                  <Text>
                    <FontAwesome5 name="minus" size={20} color="black" />
                  </Text>
                </TouchableOpacity>
                <Text style={styles.text}>Personas Involucradas</Text>
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
                <Text 
                  style={StyleSheet.compose(styles.text,
                  {
                    //flexBasis: "100%",
                    flexSrink: 0,
                  })}
                >
                  Materiales Directos
                </Text>
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
                />
              </View>
            </View>
          </Modal.Body>
          <Modal.Footer>
            <Button title="Cancelar" onPress={handleModal} />
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
  input: {
    width: "100%",
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
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignSelf: "center",
    width: "100%",
  },
  inputMaterial: {
    //width: "100%",
    borderColor: "black",
    alignSelf: "center",
    height: 40,
    borderRadius: 50,
    paddingRight: 10,
    paddingLeft: 10,
  },
});
