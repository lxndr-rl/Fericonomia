import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Modal } from "../components/Popup";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import InputSpinner from "react-native-input-spinner";
import { Picker } from "@react-native-picker/picker";

const Insercion = ({ navigation }) => {
  const [formsVisible, setFormsVisible] = useState(true);
  const [cantidadPersonas, setCantidadPersonas] = useState(1);
  const [cantidadMaterialesDirectos, setCantidadMaterialesDirectos] =
    useState(1);
  const [cantidadMaterialesIndirectos, setCantidadMaterialesIndirectos] =
    useState(1);
  const [sueldoMin, setSueldoMin] = useState(0);
  const [valorWattHora, setValorWattHora] = useState(0);
  const [valorAguaLitro, setValorAguaLitro] = useState(0);
  const [configVisible, setConfigVisible] = useState(false);
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
    mIndirectos: [
      {
        nombre: "",
        cantidad: 0,
        unidad: "",
        precio: 0,
      },
    ],
    mObraDirectos: [
      {
        nombre: "",
        cantidad: 0,
        unidad: "horas",
      },
    ],
    mObraIndirectos: [
      {
        nombre: "",
        cantidad: 0,
        unidad: "horas",
      },
    ],
    costosDirecto: [
      {
        nombre: "",
        cantidad: 0,
        unidad: "watt",
      },
    ],
    costosIndirectos: [
      {
        nombre: "",
        cantidad: 0,
        unidad: "watt",
      },
    ],
    utilidad: 0,
  });

  useEffect(() => {
    (async () => {
      //añadir boton a la barra de navegacion
      setSueldoMin(sessionStorage.getItem("sueldoMin"));
      setValorWattHora(sessionStorage.getItem("valorWattHora"));
      setValorAguaLitro(sessionStorage.getItem("valorAguaLitro"));
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{ margin: 10 }}
            onPress={() => {
              setConfigVisible(true);
            }}
          >
            <Text style={styles.text}>
              <FontAwesome name="gears" size={20} color="black" />
              Configurar Parámetros
            </Text>
          </TouchableOpacity>
        ),
      });
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
            let personasn = insertedData.personas;
            personasn[j - 1] = text;
            console.log(personasn);
            setInsertedData({ ...insertedData, personas: personasn });
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

    for (let j = 1; j <= i; j++) {
      materiales.push(
        <View style={styles.rowView}>
          <TextInput
            key={`ti-${j}-mDirecto`}
            style={styles.inputMaterial}
            placeholder={`Nombre del Material ${j}`}
            placeholderTextColor={"gray"}
            onChangeText={(text) => {
              let materialesDir = insertedData.mDirectos;
              try {
                materialesDir[j - 1].nombre = text;
              } catch {
                materialesDir.push({
                  nombre: text,
                  cantidad: 0,
                  unidad: "",
                  precio: 0,
                });
              }
              console.log(materialesDir);
              setInsertedData({ ...insertedData, mDirectos: materialesDir });
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
              let materialesDir = insertedData.mDirectos;
              materialesDir[j - 1].cantidad = value;
              setInsertedData({ ...insertedData, mDirectos: materialesDir });
            }}
          />
          <Picker
            key={`p-${j}-mDirecto`}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => {
              let materialesDir = insertedData.mDirectos;
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
              let materialesDir = insertedData.mDirectos;
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
    for (let j = 1; j <= i; j++) {
      materiales.push(
        <View style={styles.rowView}>
          <TextInput
            key={`ti-${j}-mIndirecto`}
            style={styles.inputMaterial}
            placeholder={`Nombre del Material ${j}`}
            placeholderTextColor={"gray"}
            onChangeText={(text) => {
              let materialesInd = insertedData.mIndirectos;
              try {
                materialesInd[j - 1].nombre = text;
              } catch {
                materialesInd.push({
                  nombre: text,
                  cantidad: 0,
                  unidad: "",
                  precio: 0,
                });
              }
              setInsertedData({
                ...insertedData,
                mIndirectos: materialesInd,
              });
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
              let materialesInd = insertedData.mIndirectos;
              materialesInd[j - 1].cantidad = value;
              setInsertedData({ ...insertedData, mIndirectos: materialesInd });
            }}
          />
          <Picker
            key={`p-${j}-mIndirecto`}
            onValueChange={(itemValue, itemIndex) => {
              let materialesInd = insertedData.mIndirectos;
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
              let materialesInd = insertedData.mIndirectos;
              materialesInd[j - 1].precio = text;
              setInsertedData({ ...insertedData, mIndirectos: materialesInd });
            }}
          />
        </View>
      );
    }
    return materiales;
  };

  const completarIngreso = () => {
    let productoValido;
    try {
      productoValido = insertedData.nombreProducto.length > 0;
    } catch {
      productoValido = false;
    }
    let personaValida;
    try {
      personaValida =
        insertedData.personas.length === 0 ||
        !/^[a-zA-Z]+$/.test(insertedData.personas[0]);
    } catch {
      personaValida = false;
    }
    if (!productoValido) {
      alert("Ingrese el nombre del producto");
      return;
    }

    if (!personaValida) {
      alert("Ingrese al menos un nombre válido de recursos humanos");
      return;
    }
    setFormsVisible(false);
    alert("Proceso Creado");
    alert(JSON.stringify(insertedData));
    sessionStorage.setItem("insertedData", JSON.stringify(insertedData));
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
                  completarIngreso();
                }}
              >
                <Text style={styles.buttonText}>Continuar</Text>
              </TouchableOpacity>
            </View>
          </Modal.Footer>
        </Modal.Container>
      </Modal>
      <Modal isVisible={configVisible}>
        <Modal.Container>
          <Modal.Header title="Configuración de Parámetros del Sistema" />
          <Modal.Body>
            <View style={{ margin: 20 }}>
              <Text style={styles.text}>Sueldo Mínimo x Hora</Text>
              <TextInput
                style={styles.input}
                placeholder={"Ingrese el Sueldo Mínimo x Hora"}
                keyboardType={"numeric"}
                placeholderTextColor={"gray"}
                value={sueldoMin}
                onChangeText={(text) => {
                  setSueldoMin(text);
                }}
              />
            </View>
            <View style={{ margin: 20 }}>
              <Text style={styles.text}>Valor Watt x Hora</Text>
              <TextInput
                style={styles.input}
                placeholder={"Ingrese el Valor Watt x Hora"}
                keyboardType={"numeric"}
                placeholderTextColor={"gray"}
                value={valorWattHora}
                onChangeText={(text) => {
                  setValorWattHora(text);
                }}
              />
            </View>
            <View style={{ margin: 20 }}>
              <Text style={styles.text}>Valor Agua x Litro</Text>
              <TextInput
                style={styles.input}
                placeholder={"Ingrese el Valor de Agua x Litro"}
                keyboardType={"numeric"}
                placeholderTextColor={"gray"}
                value={valorAguaLitro}
                onChangeText={(text) => {
                  setValorAguaLitro(text);
                }}
              />
            </View>
          </Modal.Body>
          <Modal.Footer>
            <View style={styles.rowView}>
              <TouchableOpacity
                style={styles.buttonCancel}
                onPress={() => setConfigVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  sessionStorage.setItem("sueldoMin", sueldoMin);
                  sessionStorage.setItem("valorWattHora", valorWattHora);
                  sessionStorage.setItem("valorAguaLitro", valorAguaLitro);
                  alert("Guardado");
                }}
              >
                <Text style={styles.buttonText}>Guardar</Text>
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
    width: Dimensions.get("window").width < 800 ? 300 : 200,
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
    flexDirection: Dimensions.get("window").width < 800 ? "column" : "row",
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
  },
  inputMaterial: {
    width: Dimensions.get("window").width < 800 ? 300 : 200,
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
    margin: 10,
  },
  button: {
    borderRadius: 50,
    alignSelf: "center",
    width: 100,
    alignItems: "center",
    backgroundColor: "green",
    margin: 10,
  },
});
