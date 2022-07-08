import React from "react";
import { Table, TableWrapper, Row } from "react-native-table-component";
import { StyleSheet, View, Text } from "react-native";
import {
  calcularSubtotalMaterial,
  dolares,
  calcularSubtotalManoObra,
  obtenerFactorConversion,
} from "../utils";

export const TablaCostos = (props) => {
  const _datosProducto = props.datosProducto;
  const sueldoMinimoHora = 425 / 240;

  const subtotalMPD = _datosProducto.mDirectos.reduce(
    (anterior, actual) =>
      anterior + calcularSubtotalMaterial(actual) * _datosProducto.cantidad,
    0
  );
  const subtotalMOD = _datosProducto.mObraDirectos.reduce(
    (anterior, actual) => {
      return (
        anterior + calcularSubtotalManoObra(actual) * _datosProducto.cantidad
      );
    },
    0
  );
  const subtotalMPI = _datosProducto.mIndirectos.reduce(
    (anterior, actual) => anterior + calcularSubtotalMaterial(actual),
    0
  );
  const subtotalMOI = _datosProducto.mObraIndirectos.reduce(
    (anterior, actual) => {
      return anterior + calcularSubtotalManoObra(actual);
    },
    0
  );

  const nombresUnidades = {
    kg: "kilos",
    lb: "libras",
    g: "gramos",
    l: "litros",
    cm3: "cm cúbicos",
    h: "horas",
    min: "minutos",
    w: "watts",
    u: "unidades",
  };

  const totalCosto = subtotalMPD + subtotalMOD + subtotalMPI + subtotalMOI;
  const pvpTotal = totalCosto * (1 + _datosProducto.margenUtilidad);
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Materias Directas
        </Text>
      </View>
      <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
        <Row
          data={[
            "Nombre",
            "Cantidad",
            "Costo/Unidad",
            "Subtotal unitario",
            "Subtotal",
          ]}
          style={styles.head}
          textStyle={styles.text}
        />
        {_datosProducto.mDirectos.map((recurso) => (
          <TableWrapper>
            <Row
              data={[
                <Text>{recurso.nombre}</Text>,
                <Text>
                  {`${recurso.cantidad} ${nombresUnidades[recurso.unidad]}`}
                </Text>,
                <Text style={{ textAlign: "right" }}>
                  {dolares(
                    recurso.precio * obtenerFactorConversion(recurso.unidad)
                  )}
                </Text>,
                <Text style={{ textAlign: "right" }}>
                  {dolares(calcularSubtotalMaterial(recurso))}
                </Text>,
                <Text style={{ textAlign: "right" }}>
                  {dolares(
                    calcularSubtotalMaterial(recurso) * _datosProducto.cantidad
                  )}
                </Text>,
              ]}
              textStyle={styles.text}
            />
          </TableWrapper>
        ))}
        <Row
          data={[
            "Subtotal",
            "",
            "",
            "",
            <Text style={{ textAlign: "right" }}>{dolares(subtotalMPD)}</Text>,
          ]}
          textStyle={styles.text}
        />
      </Table>

      <View>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Mano de Obra Directas
        </Text>
      </View>
      <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
        <Row
          data={[
            "Nombre",
            "Cantidad",
            "Costo/hora",
            "Subtotal unitario",
            "Subtotal",
          ]}
          style={styles.head}
          textStyle={styles.text}
        />
        {_datosProducto.mObraDirectos.map((recurso) => (
          <TableWrapper>
            <Row
              data={[
                <Text>{recurso.nombre}</Text>,
                <Text>
                  {`${recurso.cantidad} ${nombresUnidades[recurso.unidad]}`}
                </Text>,
                <Text style={{ textAlign: "right" }}>
                  {dolares(
                    sueldoMinimoHora * obtenerFactorConversion(recurso.unidad)
                  )}
                </Text>,
                <Text style={{ textAlign: "right" }}>
                  {dolares(calcularSubtotalManoObra(recurso))}
                </Text>,
                <Text style={{ textAlign: "right" }}>
                  {dolares(
                    calcularSubtotalManoObra(recurso) * _datosProducto.cantidad
                  )}
                </Text>,
              ]}
              textStyle={styles.text}
            />
          </TableWrapper>
        ))}
        <Row
          data={[
            "Subtotal",
            "",
            "",
            "",
            <Text style={{ textAlign: "right" }}>{dolares(subtotalMOD)}</Text>,
          ]}
          textStyle={styles.text}
        />
      </Table>

      <View>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Materias indirectas
        </Text>
      </View>
      <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
        <Row
          data={["Nombre", "Cantidad", "Precio/Unidad", "Subtotal"]}
          style={styles.head}
          textStyle={styles.text}
        />
        {_datosProducto.mIndirectos.map((recurso) => (
          <TableWrapper>
            <Row
              data={[
                <Text>{recurso.nombre}</Text>,
                <Text>
                  {`${recurso.cantidad} ${nombresUnidades[recurso.unidad]}`}
                </Text>,
                <Text style={{ textAlign: "right" }}>
                  {dolares(
                    recurso.precio * obtenerFactorConversion(recurso.unidad)
                  )}
                </Text>,
                <Text style={{ textAlign: "right" }}>
                  {dolares(calcularSubtotalMaterial(recurso))}
                </Text>,
              ]}
              textStyle={styles.text}
            />
          </TableWrapper>
        ))}
        <Row
          data={[
            "Subtotal",
            "",
            "",
            <Text style={{ textAlign: "right" }}>{dolares(subtotalMPI)}</Text>,
          ]}
          textStyle={styles.text}
        />
      </Table>

      <View>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Mano de obra Indirecta
        </Text>
      </View>
      <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
        <Row
          data={["Nombre", "Cantidad", "Costo/Unidad", "Subtotal"]}
          style={styles.head}
          textStyle={styles.text}
        />
        {_datosProducto.mObraIndirectos.map((recurso) => (
          <TableWrapper>
            <Row
              data={[
                <Text>{recurso.nombre}</Text>,
                <Text>
                  {`${recurso.cantidad} ${nombresUnidades[recurso.unidad]}`}
                </Text>,
                <Text style={{ textAlign: "right" }}>
                  {dolares(
                    sueldoMinimoHora * obtenerFactorConversion(recurso.unidad)
                  )}
                </Text>,
                <Text style={{ textAlign: "right" }}>
                  {dolares(calcularSubtotalManoObra(recurso))}
                </Text>,
              ]}
              textStyle={styles.text}
            />
          </TableWrapper>
        ))}
        <Row
          data={[
            "Subtotal",
            "",
            "",
            <Text style={{ textAlign: "right" }}>{dolares(subtotalMOI)}</Text>,
          ]}
          textStyle={styles.text}
        />
      </Table>

      <View>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Sumatoria de costos
        </Text>
      </View>
      <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
        <Row
          data={["Tipo", "Subtotal"]}
          style={styles.head}
          textStyle={styles.text}
        />
        <Row
          data={[
            <Text>Materias Primas Directas</Text>,
            <Text style={{ textAlign: "right" }}>{dolares(subtotalMPD)}</Text>,
          ]}
          textStyle={styles.text}
        />
        <Row
          data={[
            <Text>Materias Primas Indirecta</Text>,
            <Text style={{ textAlign: "right" }}>{dolares(subtotalMPI)}</Text>,
          ]}
          textStyle={styles.text}
        />
        <Row
          data={[
            <Text>Mano de Obra Directa</Text>,
            <Text style={{ textAlign: "right" }}>{dolares(subtotalMOD)}</Text>,
          ]}
          textStyle={styles.text}
        />
        <Row
          data={[
            <Text>Mano de Obra Indirecta</Text>,
            <Text style={{ textAlign: "right" }}>{dolares(subtotalMOI)}</Text>,
          ]}
          textStyle={styles.text}
        />
        <Row
          data={[
            <Text>Costos Totales</Text>,
            <Text style={{ textAlign: "right" }}>{dolares(totalCosto)}</Text>,
          ]}
          textStyle={styles.text}
        />
        <Row
          data={[
            <Text>Margen de utilidad</Text>,
            <Text style={{ textAlign: "right" }}>
              {`${_datosProducto.margenUtilidad * 100} %`}
            </Text>,
          ]}
          textStyle={styles.text}
        />
        <Row
          data={[
            <Text>Unidades producidas</Text>,
            <Text style={{ textAlign: "right" }}>
              {_datosProducto.cantidad}
            </Text>,
          ]}
          textStyle={styles.text}
        />
        <Row
          data={[
            <Text>Precio de venta total</Text>,
            <Text style={{ textAlign: "right" }}>{dolares(pvpTotal)}</Text>,
          ]}
          textStyle={styles.text}
        />
        <Row
          data={[
            <Text>Precio de venta unitario</Text>,
            <Text style={{ textAlign: "right" }}>
              {dolares(pvpTotal / _datosProducto.cantidad)}
            </Text>,
          ]}
          textStyle={styles.text}
        />
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
});
