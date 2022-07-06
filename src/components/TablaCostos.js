import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { calcularSubtotalMateriasDirectas, calcularSubtotalRecurso, dolares } from '../utils';
//import { Table, Row, Rows } from 'react-native-table-component';

export const TablaCostos = (props) => {
	const _datosProducto = {
    "nombre": "Arroz con pollo",
    "cantidad": 600,
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
        }
    ],
    "mObraIndirectos": [
        {
            "nombre": "Batir",
            "cantidad": 3,
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

	const tablasDatos = {
		mDirectos: _datosProducto.mDirectos.map(recurso => [
				[ 
					recurso.nombre,
					recurso.cantidad,
					recurso.unidad,
					recurso.precio,
					calcularSubtotalRecurso(recurso),
				]
			]
		)
	}
	
	return (
		<View style={styles.container}>
			<View><Text>Materias Directas</Text></View>
			<Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
				<Row 
					data={[
						'Nombre', 'Cantidad', 'Precio/Unidad', "Subtotal unitario", "Subtotal"
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
										{ dolares(calcularSubtotalRecurso(recurso)) }
									)</text>,
									<text style={{ textAlign: "right" }}>
										{ dolares(calcularSubtotalRecurso(recurso) * _datosProducto.cantidad) }
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
							{ dolares(_datosProducto.mDirectos.reduce(
								(anterior, actual) => anterior + calcularSubtotalRecurso(actual) * _datosProducto.cantidad, 0
							)) }
						</Text>
					]} 
			  	style={styles.head} textStyle={styles.text}	
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
