import { Button, Image } from 'react-native';
import { Text, View } from 'react-native';

import { DataContext } from '../DataContext';
import { calcularCostoTotal, calcularCostoTotalUnitario, calcularPrecioVenta, calcularSubtotalDirectoTotal, calcularSubtotalDirectoUnitario, calcularSubtotalIndirectoTotal, calcularSubtotalManoObraDirecta, calcularSubtotalManoObraIndirecta, calcularSubtotalMateriasDirectas, calcularSubtotalMateriasIndirectas, calcularSubtotalOtrosIndirectos, calcularSubtotalRecurso, dolares } from '../Utils';


export function Productos(props) {
  return (
    <View>
      {/*
      */}
      <DataContext.Consumer>
        {data => <View>{
          data.get().productos.map(producto =>
            <View key={producto.id.toString()} style={{
              border: "1px solid",
              margin: 10,
            }}>
              <Text>{producto.nombre}</Text>
              <Image source={{ uri: producto.imagen_url }} style={{ width: 300, height: 200 }} />
              <Button
                title={`Costo: ${producto.costo} | P.V.P. ${producto.costo * 1.7}`}
                onPress={() =>
                  props.navigation.navigate('Productos/verProducto', { name: 'Jane', idProducto: producto.id })}
              />
            </View>
          )
        }</View>}
      </DataContext.Consumer>
    </View>
  );
}
export function ProductoVer(props) {
  return (
    <View>
      {/*
      */}
      <DataContext.Consumer>
        {data => {
          const producto = data.get().productos.filter(producto => 
            producto.id === props.route.params.idProducto)[0]
          const sueldoMinimoHora = data.get().parametros.sueldoMinimoHora

          return <View>
            <table>
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <Text>{ producto.nombre }</Text>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Image source={{ uri: producto.imagen_url }} style={{ width: 300, height: 200 }} />
                </td>
              </tr>

              <tr>
                <td style={{ textAlign: "center" }}>
                  <Text>Materias primas directas</Text>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Text>{ dolares(calcularSubtotalMateriasDirectas(producto.recursos)) }</Text>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <table style={{ width: "100%" }}>
                    {producto.recursos
                      .filter(recurso => recurso.esCostoDirecto && recurso.tipo === "materia")
                      .map((recurso, i) => (
                        <tr key={i}>
                          <td>
                            <Text>{ recurso.nombre }</Text>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <Text>{ Math.round(recurso.cantidad*100, 2)/100 }</Text>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <Text>{ recurso.unidad }</Text>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <Text>{ dolares(recurso.unidadCosto) }</Text>
                          </td>
                          <td style={{ textAlign: "right", fontWeight: 500 }}>
                            <Text>{ dolares(calcularSubtotalRecurso(recurso)) }</Text>
                          </td>
                        </tr>
                      ))
                    }
                  </table>
                </td>
              </tr>
              
              <tr>
                <td style={{ textAlign: "center" }}>
                  <Text>Materias primas indirectas</Text>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Text>{ dolares(calcularSubtotalMateriasIndirectas(producto.recursos)) }</Text>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <table style={{ width: "100%" }}>
                    {producto.recursos
                      .filter(recurso => !recurso.esCostoDirecto && recurso.tipo === "materia")
                      .map((recurso, i) => (
                        <tr key={i}>
                          <td>
                            <Text>{ recurso.nombre }</Text>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <Text>{ Math.round(recurso.cantidad*100, 2)/100 }</Text>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <Text>{ recurso.unidad }</Text>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <Text>{ dolares(recurso.unidadCosto) }</Text>
                          </td>
                          <td style={{ textAlign: "right", fontWeight: 500 }}>
                            <Text>{ dolares(calcularSubtotalRecurso(recurso)) }</Text>
                          </td>
                        </tr>
                      ))
                    }
                  </table>
                </td>
              </tr>
              
              <tr>
                <td style={{ textAlign: "center" }}>
                  <Text>Mano de obra directa</Text>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Text>{ dolares(calcularSubtotalManoObraDirecta(producto.recursos)) }</Text>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <table style={{ width: "100%" }}>
                    {producto.recursos
                      .filter(recurso => recurso.esCostoDirecto && recurso.tipo === "manoObra")
                      .map((recurso, i) => (
                        <tr key={i}>
                          <td>
                            <Text>{ recurso.nombre }</Text>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <Text>{ Math.round(recurso.cantidad*100, 2)/100 }</Text>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <Text>{ recurso.unidad }</Text>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <Text>{ `${recurso.personasCantidad} personas` }</Text>
                          </td>
                          <td style={{ textAlign: "right", fontWeight: 500 }}>
                            <Text>{ dolares(calcularSubtotalRecurso(recurso)) }</Text>
                          </td>
                        </tr>
                      ))
                    }
                  </table>
                </td>
              </tr>
              
              <tr>
                <td style={{ textAlign: "center" }}>
                    <Text>Mano de obra indirectas</Text>
                  </td>
                <td style={{ textAlign: "right" }}>
                  <Text>{ dolares(calcularSubtotalManoObraIndirecta(producto.recursos)) }</Text>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <table style={{ width: "100%" }}>
                    {producto.recursos
                      .filter(recurso => !recurso.esCostoDirecto && recurso.tipo === "manoObra")
                      .map((recurso, i) => (
                        <tr key={i}>
                          <td>
                            <Text>{ recurso.nombre }</Text>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <Text>{ Math.round(recurso.cantidad*100, 2)/100 }</Text>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <Text>{ recurso.unidad }</Text>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <Text>{ `${recurso.personasCantidad} personas` }</Text>
                          </td>
                          <td style={{ textAlign: "right", fontWeight: 500 }}>
                            <Text>{ dolares(calcularSubtotalRecurso(recurso)) }</Text>
                          </td>
                        </tr>
                      ))
                    }
                  </table>
                </td>
              </tr>
              
              <tr>
                <td style={{ textAlign: "center" }}>
                  <Text>Otros costos indirectos</Text>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Text>{ dolares(calcularSubtotalOtrosIndirectos(producto.recursos)) }</Text>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <table style={{ width: "100%" }}>
                    {/* TODO Desgloce de servicios básicos y otros costos indirectos como el arriendo */}
                    {producto.recursos
                      .filter(recurso => recurso.tipo === "otro")
                      .map((recurso, i) => (
                        <tr key={i}>
                          <td>
                            <Text>{ recurso.nombre }</Text>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <Text>{ recurso.cantidad ? Math.round(recurso.cantidad*100, 2)/100 : "" }</Text>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <Text>{ recurso.unidad ? recurso.unidad : "" }</Text>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <Text>{ recurso.unidadCosto ? dolares(recurso.unidadCosto) : "" }</Text>
                          </td>
                          <td style={{ textAlign: "right", fontWeight: 500 }}>
                            <Text>{ dolares(calcularSubtotalRecurso(recurso)) }</Text>
                          </td>
                        </tr>
                      ))
                    }
                  </table>
                </td>
              </tr>
              
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <Text>Totales</Text>
                </td>
              </tr>
              {/* TODO Calcular subtotales y totales*/
              }
              <tr>
                <td style={{ textAlign: "left" }}>
                  <Text>Unidades producidas</Text>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Text>{ producto.cantidad }</Text>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>
                  <Text>Costos directos unitarios</Text>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Text>{ dolares(calcularSubtotalDirectoUnitario(producto.recursos)) }</Text>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>
                  <Text>Costos directos totales</Text>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Text>{ dolares(calcularSubtotalDirectoTotal(producto)) }</Text>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>
                  <Text>Costos indirectos totales</Text>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Text>{ dolares(calcularSubtotalIndirectoTotal(producto.recursos)) }</Text>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>
                  <Text>Costos totales</Text>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Text>{ dolares(calcularCostoTotal(producto)) }</Text>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>
                  <Text>Costos totales unitarios</Text>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Text>{ dolares(calcularCostoTotalUnitario(producto)) }</Text>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>
                  <Text>Precio de venta</Text>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Text>{ dolares(calcularPrecioVenta(producto)) }</Text>
                </td>
              </tr>
            </table>
            
            <Button
              title={"Editar Producto"}
              onPress={() =>
                props.navigation.navigate('Productos/verProducto', { 
                  name: `Detalles de ${producto.nombre}`, idProducto: producto.id })}
            />
          </View>
        }}
      </DataContext.Consumer>
    </View>
  );
}

