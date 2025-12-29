import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';

export default function DetalleEvento({ evento, onVolver }) {
  if (!evento) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onVolver} style={styles.botonVolver}>
          <Text style={styles.textoVolver}>Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle del Evento</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <Image source={{ uri: evento.foto }} style={styles.imagenPrincipal} />

        <View style={styles.infoContainer}>
          <View style={styles.campo}>
            <Text style={styles.label}>Fecha</Text>
            <Text style={styles.valor}>{evento.fecha}</Text>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Título</Text>
            <Text style={styles.titulo}>{evento.titulo}</Text>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Descripción</Text>
            <Text style={styles.descripcion}>{evento.descripcion}</Text>
          </View>

          <View style={styles.infoAdicional}>
            <Text style={styles.textoAdicional}>
              Evento registrado en el sistema de emergencias 911
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#dc2626',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  botonVolver: {
    marginBottom: 10,
  },
  textoVolver: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  imagenPrincipal: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
  },
  infoContainer: {
    padding: 20,
  },
  campo: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 5,
  },
  valor: {
    fontSize: 16,
    color: '#333',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  descripcion: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  infoAdicional: {
    backgroundColor: '#f0f9ff',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  textoAdicional: {
    fontSize: 14,
    color: '#1e40af',
  },
});
