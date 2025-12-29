import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormularioEvento from './components/FormularioEvento';
import ListaEventos from './components/ListaEventos';
import DetalleEvento from './components/DetalleEvento';

export default function App() {
  const [eventos, setEventos] = useState([]);
  const [vistaActual, setVistaActual] = useState('lista');
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  useEffect(() => {
    cargarEventos();
  }, []);

  const cargarEventos = async () => {
    try {
      const eventosGuardados = await AsyncStorage.getItem('eventos911');
      if (eventosGuardados) {
        setEventos(JSON.parse(eventosGuardados));
      }
    } catch (error) {
      console.error('Error al cargar eventos:', error);
    }
  };

  const guardarEvento = async (nuevoEvento) => {
    try {
      const eventosActualizados = [...eventos, { ...nuevoEvento, id: Date.now().toString() }];
      await AsyncStorage.setItem('eventos911', JSON.stringify(eventosActualizados));
      setEventos(eventosActualizados);
      setVistaActual('lista');
    } catch (error) {
      console.error('Error al guardar evento:', error);
    }
  };

  const verDetalle = (evento) => {
    setEventoSeleccionado(evento);
    setVistaActual('detalle');
  };

  const renderizarVista = () => {
    if (vistaActual === 'formulario') {
      return (
        <FormularioEvento 
          onGuardar={guardarEvento}
          onCancelar={() => setVistaActual('lista')}
        />
      );
    } 
    else if (vistaActual === 'detalle') {
      return (
        <DetalleEvento 
          evento={eventoSeleccionado}
          onVolver={() => setVistaActual('lista')}
        />
      );
    } 
    else {
      return (
        <ListaEventos 
          eventos={eventos}
          onNuevo={() => setVistaActual('formulario')}
          onVerDetalle={verDetalle}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {renderizarVista()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
