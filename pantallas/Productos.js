import { Button, Image } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import { DataContext } from '../DataContext';
import { dolares } from '../Utils';


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
                title={<Text>Costo: {producto.costo} | P.V.P. {producto.costo * 1.7}</Text>}
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

          return <View>
            <table>
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>{ producto.nombre }</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Image source={{ uri: producto.imagen_url }} style={{ width: 300, height: 200 }} />
                </td>
              </tr>

              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>Materias primas directas</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <table style={{ width: "100%" }}>
                    {producto.recursos
                      .filter(recurso => recurso.esCostoDirecto && recurso.tipo === "materia")
                      .map((recurso, i) => (
                        <tr key={i}>
                          <td>
                            { recurso.nombre }
                          </td>
                          <td style={{ textAlign: "right" }}>
                            { recurso.cantidad }
                          </td>
                          <td style={{ textAlign: "right" }}>
                            { recurso.unidad }
                          </td>
                          <td style={{ textAlign: "right" }}>
                            { dolares(recurso.unidadCosto) }
                          </td>
                          <td style={{ textAlign: "right", fontWeight: 500 }}>{ dolares(
                              recurso.unidadCosto * recurso.cantidad 
                              * (recurso.personasCantidad ? recurso.personasCantidad : 1) 
                              // TODO Agregar ltros valores que puedan totalizar
                            ) 
                          }</td>
                        </tr>
                      ))
                    }
                  </table>
                </td>
              </tr>
              
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>Materias primas indirectas</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <table style={{ width: "100%" }}>
                    {producto.recursos
                      .filter(recurso => !recurso.esCostoDirecto && recurso.tipo === "materia")
                      .map((recurso, i) => (
                        <tr key={i}>
                          <td>
                            { recurso.nombre }
                          </td>
                          <td style={{ textAlign: "right" }}>
                            { recurso.cantidad }
                          </td>
                          <td style={{ textAlign: "right" }}>
                            { recurso.unidad }
                          </td>
                          <td style={{ textAlign: "right" }}>
                            { dolares(recurso.unidadCosto) }
                          </td>
                          <td style={{ textAlign: "right", fontWeight: 500 }}>{ dolares(
                              recurso.unidadCosto * recurso.cantidad 
                              * (recurso.personasCantidad ? recurso.personasCantidad : 1) 
                              // TODO Agregar ltros valores que puedan totalizar
                            ) 
                          }</td>
                        </tr>
                      ))
                    }
                  </table>
                </td>
              </tr>
              
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>Mano de obra directa</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <table style={{ width: "100%" }}>
                    {producto.recursos
                      .filter(recurso => recurso.esCostoDirecto && recurso.tipo === "manoObra")
                      .map((recurso, i) => (
                        <tr key={i}>
                          <td>
                            { recurso.nombre }
                          </td>
                          <td style={{ textAlign: "right" }}>
                            { recurso.cantidad }
                          </td>
                          <td style={{ textAlign: "right" }}>
                            { recurso.unidad }
                          </td>
                          <td style={{ textAlign: "right" }}>
                            { dolares(recurso.unidadCosto) }
                          </td>
                          <td style={{ textAlign: "right", fontWeight: 500 }}>{ dolares(
                              recurso.unidadCosto * recurso.cantidad 
                              * (recurso.personasCantidad ? recurso.personasCantidad : 1) 
                              // TODO Agregar ltros valores que puedan totalizar
                            ) 
                          }</td>
                        </tr>
                      ))
                    }
                  </table>
                </td>
              </tr>
              
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>Mano de obra indirectas</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <table style={{ width: "100%" }}>
                    {producto.recursos
                      .filter(recurso => !recurso.esCostoDirecto && recurso.tipo === "manoObra")
                      .map((recurso, i) => (
                        <tr key={i}>
                          <td>
                            { recurso.nombre }
                          </td>
                          <td style={{ textAlign: "right" }}>
                            { recurso.cantidad }
                          </td>
                          <td style={{ textAlign: "right" }}>
                            { recurso.unidad }
                          </td>
                          <td style={{ textAlign: "right" }}>
                            { dolares(recurso.unidadCosto) }
                          </td>
                          <td style={{ textAlign: "right", fontWeight: 500 }}>{ dolares(
                              recurso.unidadCosto * recurso.cantidad 
                              * (recurso.personasCantidad ? recurso.personasCantidad : 1) 
                              // TODO Agregar ltros valores que puedan totalizar
                            ) 
                          }</td>
                        </tr>
                      ))
                    }
                  </table>
                </td>
              </tr>
              
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>Otros costos indirectos</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <table style={{ width: "100%" }}>
                    {producto.recursos
                      .filter(recurso => recurso.tipo === "otros")
                      .map((recurso, i) => (
                        <tr key={i}>
                          <td>
                            { recurso.nombre }
                          </td>
                          <td style={{ textAlign: "right" }}>
                            { recurso.cantidad }
                          </td>
                          <td style={{ textAlign: "right" }}>
                            { recurso.unidad }
                          </td>
                          <td style={{ textAlign: "right" }}>
                            { dolares(recurso.unidadCosto) }
                          </td>
                          <td style={{ textAlign: "right", fontWeight: 500 }}>{ dolares(
                              recurso.unidadCosto * recurso.cantidad 
                              * (recurso.personasCantidad ? recurso.personasCantidad : 1) 
                              // TODO Agregar ltros valores que puedan totalizar
                            ) 
                          }</td>
                        </tr>
                      ))
                    }
                  </table>
                </td>
              </tr>
              
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>Totales</td>
              </tr>
              {/* TODO Calcular subtotales y totales*/
              }
              <tr>
                <td style={{ textAlign: "left" }}>
                  Costos directos
                </td>
                <td style={{ textAlign: "right" }}>
                  { producto.costo }
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>
                  Costos indirectos
                </td>
                <td style={{ textAlign: "right" }}>
                  { producto.costo }
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>
                  Costos totales
                </td>
                <td style={{ textAlign: "right" }}>
                  { producto.costo }
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>
                  Precio de venta
                </td>
                <td style={{ textAlign: "right" }}>
                  { producto.costo*1.7 }
                </td>
              </tr>
            </table>
            
            <Button
              title={<Text>Editar Producto</Text>}
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

