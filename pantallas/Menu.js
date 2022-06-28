import { Button } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

export function Menu(props) {
    // TODO Esto es solo para dirigirse a un formulario, solo para probar
    //props.navigation.navigate('Productos/verProducto', { name: 'Jane', idProducto: 1 })

    return (
        <View>
            {/* TODO Poner íconos */}
            <Button title={"Ver productos"} 
                onPress={ () => props.navigation.navigate('Productos') }
            />
            <Button title={"Configuración"} 
                onPress={ () => props.navigation.navigate('Configuracion') }
            />
            <Button title={"Acerca de"} 
                onPress={ () => props.navigation.navigate('AcercaDe') }
            />
      </View>
    );
  }

