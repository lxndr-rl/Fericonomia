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
import { TablaCostos } from "../components/TablaCostos";

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
  const [cantidadManoDeObraIndirectos, setCantidadManoDeObraIndirectos] =
    useState(1);
  const [cantidadManoDeObraDirectos, setCantidadManoDeObraDirectos] =
    useState(1);
  const [cantidadCostosDirectos, setCantidadCostosDirectos] = useState(1);
  const [cantidadCostosIndirectos, setCantidadCostosIndirectos] = useState(1);
  const [showTable, setShowTable] = useState(false);
  const [insertedData, setInsertedData] = useState({
    nombreProducto: "",
    cantidad: 0,
    personas: [],
    mDirectos: [
      {
        nombre: "",
        cantidad: 1,
        unidad: "l",
        precio: 0,
      },
    ],
    mIndirectos: [
      {
        nombre: "",
        cantidad: 1,
        unidad: "l",
        precio: 0,
      },
    ],
    mObraDirectos: [
      {
        nombre: "",
        cantidad: 1,
        unidad: "h",
      },
    ],
    mObraIndirectos: [
      {
        nombre: "",
        cantidad: 1,
        unidad: "h",
      },
    ],
    costosDirecto: [
      {
        nombre: "",
        cantidad: 1,
        unidad: "w",
      },
    ],
    costosIndirectos: [
      {
        nombre: "",
        cantidad: 1,
        unidad: "w",
      },
    ],
    margenUtilidad: 0,
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
            initialValue={1}
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
            initialValue={1}
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

  const manoDeObraIndirectosFields = (i) => {
    if (i <= 0) {
      setCantidadManoDeObraIndirectos(1);
      i = 1;
    }
    let manoObra = [];
    for (let j = 1; j <= i; j++) {
      manoObra.push(
        <View style={styles.rowView}>
          <TextInput
            key={`ti-${j}-manoIndirecto`}
            style={styles.inputMaterial}
            placeholder={`Nombre de la actividad ${j}`}
            placeholderTextColor={"gray"}
            onChangeText={(text) => {
              let materialesInd = insertedData.mObraIndirectos;
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
                mObraIndirectos: materialesInd,
              });
            }}
          />
          <InputSpinner
            key={`is-${j}-manoIndirecto`}
            max={100}
            min={0}
            step={1}
            colorMax={"#f04048"}
            colorMin={"#40c5f4"}
            initialValue={1}
            height={40}
            width={100}
            style={{ marginHorizontal: 10 }}
            buttonStyle={{ width: 20, height: 20 }}
            onChange={(value) => {
              let materialesInd = insertedData.mObraIndirectos;
              materialesInd[j - 1].cantidad = value;
              setInsertedData({
                ...insertedData,
                mObraIndirectos: materialesInd,
              });
            }}
          />
          <Picker
            key={`p-${j}-manoIndirecto`}
            onValueChange={(itemValue, itemIndex) => {
              let materialesInd = insertedData.mObraIndirectos;
              materialesInd[j - 1].unidad = itemValue;
              setInsertedData({
                ...insertedData,
                mObraIndirectos: materialesInd,
              });
            }}
          >
            <Picker.Item label="Horas" value="h" />
            <Picker.Item label="Minutos" value="min" />
          </Picker>
        </View>
      );
    }
    return manoObra;
  };

  const manoDeObraDirectosFields = (i) => {
    if (i <= 0) {
      setCantidadManoDeObraDirectos(1);
      i = 1;
    }
    let manoObra = [];
    for (let j = 1; j <= i; j++) {
      manoObra.push(
        <View style={styles.rowView}>
          <TextInput
            key={`ti-${j}-manoDirecto`}
            style={styles.inputMaterial}
            placeholder={`Nombre de la actividad ${j}`}
            placeholderTextColor={"gray"}
            onChangeText={(text) => {
              let materialesInd = insertedData.mObraDirectos;
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
                mObraDirectos: materialesInd,
              });
            }}
          />
          <InputSpinner
            key={`is-${j}-manoDirecto`}
            max={100}
            min={0}
            step={1}
            initialValue={1}
            colorMax={"#f04048"}
            colorMin={"#40c5f4"}
            height={40}
            width={100}
            style={{ marginHorizontal: 10 }}
            buttonStyle={{ width: 20, height: 20 }}
            onChange={(value) => {
              let materialesInd = insertedData.mObraDirectos;
              materialesInd[j - 1].cantidad = value;
              setInsertedData({
                ...insertedData,
                mObraDirectos: materialesInd,
              });
            }}
          />
          <Picker
            key={`p-${j}-manoDirecto`}
            onValueChange={(itemValue, itemIndex) => {
              let materialesInd = insertedData.mObraDirectos;
              materialesInd[j - 1].unidad = itemValue;
              setInsertedData({
                ...insertedData,
                mObraDirectos: materialesInd,
              });
            }}
          >
            <Picker.Item label="Horas" value="h" />
            <Picker.Item label="Minutos" value="min" />
          </Picker>
        </View>
      );
    }
    return manoObra;
  };

  const costosDirectosFields = (i) => {
    if (i <= 0) {
      setCantidadCostosDirectos(1);
      i = 1;
    }
    let costos = [];
    for (let j = 1; j <= i; j++) {
      costos.push(
        <View style={styles.rowView}>
          <TextInput
            key={`ti-${j}-costosDirecto`}
            style={styles.inputMaterial}
            placeholder={`Nombre de la actividad ${j}`}
            placeholderTextColor={"gray"}
            onChangeText={(text) => {
              let materialesInd = insertedData.costosDirecto;
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
                costosDirecto: materialesInd,
              });
            }}
          />
          <InputSpinner
            key={`is-${j}-costosDirecto`}
            max={100}
            min={0}
            initialValue={1}
            step={1}
            colorMax={"#f04048"}
            colorMin={"#40c5f4"}
            height={40}
            width={100}
            style={{ marginHorizontal: 10 }}
            buttonStyle={{ width: 20, height: 20 }}
            onChange={(value) => {
              let materialesInd = insertedData.costosDirecto;
              materialesInd[j - 1].cantidad = value;
              setInsertedData({
                ...insertedData,
                costosDirecto: materialesInd,
              });
            }}
          />
          <Picker
            key={`p-${j}-costosDirecto`}
            onValueChange={(itemValue, itemIndex) => {
              let materialesInd = insertedData.costosDirecto;
              materialesInd[j - 1].unidad = itemValue;
              setInsertedData({
                ...insertedData,
                costosDirecto: materialesInd,
              });
            }}
          >
            <Picker.Item label="Watt" value="w" />
            <Picker.Item label="Litros" value="l" />
          </Picker>
        </View>
      );
    }
    return costos;
  };

  const costosIndirectosFields = (i) => {
    if (i <= 0) {
      setCantidadCostosIndirectos(1);
      i = 1;
    }
    let costos = [];
    for (let j = 1; j <= i; j++) {
      costos.push(
        <View style={styles.rowView}>
          <TextInput
            key={`ti-${j}-costosIndirecto`}
            style={styles.inputMaterial}
            placeholder={`Nombre de la actividad ${j}`}
            placeholderTextColor={"gray"}
            onChangeText={(text) => {
              let materialesInd = insertedData.costosIndirectos;
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
                costosIndirectos: materialesInd,
              });
            }}
          />
          <InputSpinner
            key={`is-${j}-costosIndirecto`}
            max={100}
            min={0}
            step={1}
            colorMax={"#f04048"}
            initialValue={1}
            colorMin={"#40c5f4"}
            height={40}
            width={100}
            style={{ marginHorizontal: 10 }}
            buttonStyle={{ width: 20, height: 20 }}
            onChange={(value) => {
              let materialesInd = insertedData.costosIndirectos;
              materialesInd[j - 1].cantidad = value;
              setInsertedData({
                ...insertedData,
                costosIndirectos: materialesInd,
              });
            }}
          />
          <Picker
            key={`p-${j}-costosIndirecto`}
            onValueChange={(itemValue, itemIndex) => {
              let materialesInd = insertedData.costosIndirectos;
              materialesInd[j - 1].unidad = itemValue;
              setInsertedData({
                ...insertedData,
                costosIndirectos: materialesInd,
              });
            }}
          >
            <Picker.Item label="Watt" value="w" />
            <Picker.Item label="Litros" value="l" />
          </Picker>
        </View>
      );
    }
    return costos;
  };

  const completarIngreso = () => {
    console.log(insertedData);
    let productoValido;
    try {
      productoValido = insertedData.nombreProducto.length > 0;
    } catch {
      productoValido = false;
    }
    let personaValida;
    try {
      personaValida =
        insertedData.personas.length > 0 ||
        !/^[a-zA-Z]+$/.test(insertedData.personas[0]);
    } catch {
      personaValida = false;
    }
    let materDirValido;
    try {
      materDirValido =
        insertedData.mObraDirectos.length > 0 ||
        !/^[a-zA-Z]+$/.test(insertedData.mObraDirectos[0].nombre) ||
        insertedData.mObraDirectos[0].cantidad === 0 ||
        insertedData.mObraDirectos[0].precio === 0;
    } catch {
      materDirValido = false;
    }
    let materIndValido;
    try {
      materIndValido =
        insertedData.mObraIndirectos.length > 0 ||
        !/^[a-zA-Z]+$/.test(insertedData.mObraIndirectos[0].nombre) ||
        insertedData.mObraIndirectos[0].cantidad === 0 ||
        insertedData.mObraIndirectos[0].precio === 0;
    } catch {
      materIndValido = false;
    }
    let costosDirValido;
    try {
      costosDirValido =
        insertedData.costosDirecto.length > 0 ||
        !/^[a-zA-Z]+$/.test(insertedData.costosDirecto[0].nombre) ||
        insertedData.costosDirecto[0].cantidad === 0;
    } catch {
      costosDirValido = false;
    }
    let costosIndValido;
    try {
      costosIndValido =
        insertedData.costosIndirectos.length > 0 ||
        !/^[a-zA-Z]+$/.test(insertedData.costosIndirectos[0].nombre) ||
        insertedData.costosIndirectos[0].cantidad === 0;
    } catch {
      costosIndValido = false;
    }

    if (!productoValido) {
      alert("Ingrese el nombre del producto");
      return;
    }

    if (!personaValida) {
      alert("Ingrese al menos un nombre válido de recursos humanos");
      return;
    }
    if (!materDirValido) {
      alert("Ingrese al menos un material directo válido");
      return;
    }
    if (!materIndValido) {
      alert("Ingrese al menos un material indirecto válido");
      return;
    }
    if (!costosDirValido) {
      alert("Ingrese al menos un costo directo válido");
      return;
    }
    if (!costosIndValido) {
      alert("Ingrese al menos un costo indirecto válido");
      return;
    }
    setFormsVisible(false);
    setShowTable(true);
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
            </View>

            <View style={{ margin: 20 }}>
              <View style={styles.rowView}>
                <TouchableOpacity
                  style={styles.buttonAD}
                  onPress={() => {
                    setCantidadManoDeObraDirectos(
                      cantidadManoDeObraDirectos - 1
                    );
                  }}
                >
                  <Text>
                    <FontAwesome5 name="minus" size={20} color="black" />
                  </Text>
                </TouchableOpacity>
                <Text style={styles.text}>Mano de Obra Directa</Text>
                <TouchableOpacity
                  style={styles.buttonAD}
                  onPress={() => {
                    setCantidadManoDeObraDirectos(
                      cantidadManoDeObraDirectos + 1
                    );
                  }}
                >
                  <Text>
                    <FontAwesome5 name="plus" size={20} color="black" />
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                {manoDeObraDirectosFields(cantidadManoDeObraDirectos)}
              </View>
            </View>

            <View style={{ margin: 20 }}>
              <View style={styles.rowView}>
                <TouchableOpacity
                  style={styles.buttonAD}
                  onPress={() => {
                    setCantidadManoDeObraIndirectos(
                      cantidadManoDeObraIndirectos - 1
                    );
                  }}
                >
                  <Text>
                    <FontAwesome5 name="minus" size={20} color="black" />
                  </Text>
                </TouchableOpacity>
                <Text style={styles.text}>Mano de Obra Indirecta</Text>
                <TouchableOpacity
                  style={styles.buttonAD}
                  onPress={() => {
                    setCantidadManoDeObraIndirectos(
                      cantidadManoDeObraIndirectos + 1
                    );
                  }}
                >
                  <Text>
                    <FontAwesome5 name="plus" size={20} color="black" />
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                {manoDeObraIndirectosFields(cantidadManoDeObraIndirectos)}
              </View>
            </View>

            <View style={{ margin: 20 }}>
              <View style={styles.rowView}>
                <TouchableOpacity
                  style={styles.buttonAD}
                  onPress={() => {
                    setCantidadCostosDirectos(cantidadCostosDirectos - 1);
                  }}
                >
                  <Text>
                    <FontAwesome5 name="minus" size={20} color="black" />
                  </Text>
                </TouchableOpacity>
                <Text style={styles.text}>Costos Directos</Text>
                <TouchableOpacity
                  style={styles.buttonAD}
                  onPress={() => {
                    setCantidadCostosDirectos(cantidadCostosDirectos + 1);
                  }}
                >
                  <Text>
                    <FontAwesome5 name="plus" size={20} color="black" />
                  </Text>
                </TouchableOpacity>
              </View>
              <View>{costosDirectosFields(cantidadCostosDirectos)}</View>
            </View>

            <View style={{ margin: 20 }}>
              <View style={styles.rowView}>
                <TouchableOpacity
                  style={styles.buttonAD}
                  onPress={() => {
                    setCantidadCostosIndirectos(cantidadCostosIndirectos - 1);
                  }}
                >
                  <Text>
                    <FontAwesome5 name="minus" size={20} color="black" />
                  </Text>
                </TouchableOpacity>
                <Text style={styles.text}>Costos Indirectos</Text>
                <TouchableOpacity
                  style={styles.buttonAD}
                  onPress={() => {
                    setCantidadCostosIndirectos(cantidadCostosIndirectos + 1);
                  }}
                >
                  <Text>
                    <FontAwesome5 name="plus" size={20} color="black" />
                  </Text>
                </TouchableOpacity>
              </View>
              <View>{costosIndirectosFields(cantidadCostosIndirectos)}</View>
            </View>

            <View style={{ margin: 20 }}>
              <View>
                <Text style={styles.text}>
                  Ingrese la Cantidad de Unidades a Ofrecer
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder={"Ingrese la Cantidad de Unidades"}
                  keyboardType={"numeric"}
                  placeholderTextColor={"gray"}
                  onChangeText={(text) => {
                    setInsertedData({
                      ...insertedData,
                      cantidad: Number(text),
                    });
                  }}
                />
              </View>
            </View>

            <View style={{ margin: 20 }}>
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
                      margenUtilidad: text,
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
      {showTable && <TablaCostos datosProducto={insertedData} />}
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
