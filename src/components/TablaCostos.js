import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { calcularSubtotalMateriasDirectas, calcularSubtotalMaterial, dolares, obtenerParametro, calcularSubtotalManoObra } from '../utils';
//import { Table, Row, Rows } from 'react-native-table-component';

export const TablaCostos = (props) => {
	const _datosProducto = {
    "nombre": "Arroz con pollo",
    "cantidad": 600,
    "margenUtilidad": 0.7,
    "personas": [
      {
          "nombres": "Ariel Alexander",
          "apellidos": "Aguayo Alvarez"
      }
    ],
    "mDirectos": [
			{
				"nombre": "Leche",
				"cantidad": 3,
				"unidad": "litros",
				"precio": 0.85
			},
			{
				"nombre": "Harina",
				"cantidad": 2.6,
				"unidad": "libras",
				"precio": 1.05
			},
    ],
    "mIndirectos": [
        {
					"nombre": "Servilletas",
					"cantidad": 3,
					"unidad": "unidades",
					"precio": 0.50
        }
    ],
    "mObraDirectos": [
        {
            "nombre": "Rellenar",
            "cantidad": 3,
            "unidad": "horas"
        },
        {
            "nombre": "Aplastar",
            "cantidad": 2,
            "unidad": "horas"
        },
    ],
    "mObraIndirectos": [
        {
            "nombre": "Batir",
            "cantidad": 5.5,
            "unidad": "horas"
        }
    ],
    "costosDirectos": [
        {
            "nombre": "Planckado",
            "cantidad": 4000,
            "unidad": "watt"
        }
    ],
    "costosIndirectos": [
        {
            "nombre": "Lavado",
            "cantidad": 15000,
            "unidad": "Li"
        }
    ]
  }
	const sueldoMinimoHora = 425/240
	
	const subtotalMPD = _datosProducto.mDirectos.reduce(
		(anterior, actual) => anterior + calcularSubtotalMaterial(actual) * _datosProducto.cantidad, 0
	);
	const subtotalMOD = _datosProducto.mObraDirectos.reduce(
		(anterior, actual) => {
			return anterior + calcularSubtotalManoObra(actual) * _datosProducto.cantidad;
		}, 0
	);
	const subtotalMPI = _datosProducto.mIndirectos.reduce(
		(anterior, actual) => anterior + calcularSubtotalMaterial(actual), 0
	);
	const subtotalMOI = _datosProducto.mObraIndirectos.reduce(
		(anterior, actual) => {
			return anterior + calcularSubtotalManoObra(actual);
		}, 0
	);
	
	const totalCosto = subtotalMPD + subtotalMOD + subtotalMPI + subtotalMOI;
	const pvpTotal = totalCosto * (1 + _datosProducto.margenUtilidad);
	return (
		<View style={styles.container}>
			<View><Text>Materias Directas</Text></View>
			<Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
				<Row 
					data={[
						'Nombre', 'Cantidad', 'Costo/Unidad', "Subtotal unitario", "Subtotal"
					]} 
			  	style={styles.head} textStyle={styles.text}	
				/>
				{_datosProducto.mDirectos.map(
					recurso => (
						<TableWrapper>
							<Row 
								data={[
									<text>
										{ recurso.nombre}
									</text>,
									<text>
										{ `${recurso.cantidad} ${recurso.unidad}` }
									</text>,
									<text style={{ textAlign: "right" }}>
										{ dolares(recurso.precio) }
									</text>,
									<text style={{ textAlign: "right" }}>
										{ dolares(calcularSubtotalMaterial(recurso)) }
									</text>,
									<text style={{ textAlign: "right" }}>
										{ dolares(calcularSubtotalMaterial(recurso) * _datosProducto.cantidad) }
									</text>,
								]}
								textStyle={styles.text}
							/>
						</TableWrapper>
					)
				)}
				<Row 
					data={[
						'Sobtotal', '', '', "", 
						<Text style={{ textAlign: "right" }}>
							{ dolares(subtotalMPD) }
						</Text>
					]} 
			  	textStyle={styles.text}	
				/>
			</Table>
			
			<View><Text>Mano de Obra Directas</Text></View>
			<Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
				<Row 
					data={[
						'Nombre', 'Cantidad', 'Costo/hora', "Subtotal unitario", "Subtotal"
					]} 
			  	style={styles.head} textStyle={styles.text}	
				/>
				{_datosProducto.mObraDirectos.map(
					recurso => (
						<TableWrapper>
							<Row 
								data={[
									<text>
										{ recurso.nombre}
									</text>,
									<text>
										{ `${recurso.cantidad} ${recurso.unidad}` }
									</text>,
									<text style={{ textAlign: "right" }}>
										{ dolares(sueldoMinimoHora) }
									</text>,
									<text style={{ textAlign: "right" }}>
										{ dolares(calcularSubtotalManoObra(recurso)) }
									</text>,
									<text style={{ textAlign: "right" }}>
										{ dolares(calcularSubtotalManoObra(recurso) * _datosProducto.cantidad ) }
									</text>,
								]}
								textStyle={styles.text}
							/>
						</TableWrapper>
					)
				)}
				<Row 
					data={[
						'Sobtotal', '', '', "", 
						<Text style={{ textAlign: "right" }}>
							{ dolares(subtotalMOD) }
						</Text>
					]} 
			  	textStyle={styles.text}	
				/>
			</Table>

			<View><Text>Materias indirectas</Text></View>
			<Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
				<Row 
					data={[
						'Nombre', 'Cantidad', 'Precio/Unidad', "Subtotal"
					]} 
			  	style={styles.head} textStyle={styles.text}	
				/>
				{_datosProducto.mIndirectos.map(
					recurso => (
						<TableWrapper>
							<Row 
								data={[
									<text>
										{ recurso.nombre}
									</text>,
									<text>
										{ `${recurso.cantidad} ${recurso.unidad}` }
									</text>,
									<text style={{ textAlign: "right" }}>
										{ dolares(recurso.precio) }
									</text>,
									<text style={{ textAlign: "right" }}>
										{ dolares(calcularSubtotalMaterial(recurso)) }
									</text>,
								]}
								textStyle={styles.text}
							/>
						</TableWrapper>
					)
				)}
				<Row 
					data={[
						'Sobtotal', '', '', 
						<Text style={{ textAlign: "right" }}>
							{ dolares(subtotalMPI) }
						</Text>
					]} 
			  	textStyle={styles.text}	
				/>
			</Table>

			<View><Text>Mano de obra Indirecta</Text></View>
			<Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
				<Row 
					data={[
						'Nombre', 'Cantidad', 'Costo/Unidad', "Subtotal"
					]} 
			  	style={styles.head} textStyle={styles.text}	
				/>
				{_datosProducto.mObraIndirectos.map(
					recurso => (
						<TableWrapper>
							<Row 
								data={[
									<text>
										{ recurso.nombre}
									</text>,
									<text>
										{ `${recurso.cantidad} ${recurso.unidad}` }
									</text>,
									<text style={{ textAlign: "right" }}>
										{ dolares(sueldoMinimoHora) }
									</text>,
									<text style={{ textAlign: "right" }}>
										{ dolares(calcularSubtotalManoObra(recurso)) }
									</text>,
								]}
								textStyle={styles.text}
							/>
						</TableWrapper>
					)
				)}
				<Row 
					data={[
						'Sobtotal', '', '', 
						<Text style={{ textAlign: "right" }}>
							{ dolares(subtotalMOI) }
						</Text>
					]} 
			  	textStyle={styles.text}	
				/>
			</Table>
			
			<View><Text>Sumatoria de costos</Text></View>
			<Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
				<Row data={[ 'Tipo', 'Sobtotal' ]} style={styles.head} textStyle={styles.text} />
				<Row 
					data={[
						<text>Materias Primas Directas</text>,
						<text style={{ textAlign: "right" }}>{ dolares(subtotalMPD) }</text>
					]}
					textStyle={styles.text}
				/>
				<Row 
					data={[
						<text>Materias Primas Indirecta</text>,
						<text style={{ textAlign: "right" }}>{ dolares(subtotalMPI) }</text>
					]}
					textStyle={styles.text}
				/>
				<Row 
					data={[
						<text>Mano de Obra Directa</text>,
						<text style={{ textAlign: "right" }}>{ dolares(subtotalMOD) }</text>
					]}
					textStyle={styles.text}
				/>
				<Row 
					data={[
						<text>Mano de Obra Indirecta</text>,
						<text style={{ textAlign: "right" }}>{ dolares(subtotalMOI) }</text>
					]}
					textStyle={styles.text}
				/>
				<Row 
					data={[
						<text>Costos Totales</text>,
						<text style={{ textAlign: "right" }}>{ dolares(totalCosto) }</text>
					]}
					textStyle={styles.text}
				/>
				<Row 
					data={[
						<text>Margen de utilidad</text>,
						<text style={{ textAlign: "right" }}>
							{ `${_datosProducto.margenUtilidad*100} %` }
						</text>
					]}
					textStyle={styles.text}
				/>
				<Row 
					data={[
						<text>Precio de venta total</text>,
						<text style={{ textAlign: "right" }}>{ dolares(pvpTotal) }</text>
					]}
					textStyle={styles.text}
				/>
				<Row 
					data={[
						<text>Precio de venta unitario</text>,
						<text style={{ textAlign: "right" }}>{ dolares(
							pvpTotal / _datosProducto.cantidad) }
						</text>
					]}
					textStyle={styles.text}
				/>
			</Table>
		</View>
	)
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});
