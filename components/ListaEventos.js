import React from 'react';
import { 
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
export default function ListaEventos({ eventos, onNuevo, onVerDetalle }) {
  
  const renderEvento = ({ item }) => (
    <TouchableOpacity 
      style={styles.eventoCard}
      onPress={() => onVerDetalle(item)}
>
      <Image source={{ uri: item.foto }} style={styles.thumbnail} />
      <View style={styles.eventoInfo}>
        <Text style={styles.eventoTitulo} numberOfLines={1}>
          {item.titulo}
        </Text>
        <Text style={styles.eventoFecha}>{item.fecha}</Text>
        <Text style={styles.eventoDescripcion} numberOfLines={2}>
          {item.descripcion}
        </Text>
      </View>
      <Text style={styles.iconoFlecha}></Text>
    </TouchableOpacity>
  );

  // ...existing code...
  // ============================================
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Emergencias 911</Text>
        <Text style={styles.headerSubtitle}>
          {eventos.length} evento{eventos.length !== 1 ? 's' : ''} registrado{eventos.length !== 1 ? 's' : ''}
        </Text>
      </View>
      {eventos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}></Text>
          <Text style={styles.emptyText}>No hay eventos registrados</Text>
          <Text style={styles.emptySubtext}>
            Presiona el botón + para agregar un nuevo evento
          </Text>
        </View>
      ) : (
        <FlatList
          data={eventos}
          keyExtractor={(item) => item.id}
          renderItem={renderEvento}
          contentContainerStyle={styles.lista}
        />
      )}
      <TouchableOpacity 
        style={styles.botonFlotante} 
        onPress={onNuevo}
      >
        <Text style={styles.textoBotonFlotante}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#dc2626',
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  lista: {
    padding: 15,
  },
  eventoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  eventoInfo: {
    flex: 1,
  },
  eventoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  eventoFecha: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  eventoDescripcion: {
    fontSize: 14,
    color: '#888',
  },
  iconoFlecha: {
    fontSize: 20,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  botonFlotante: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#dc2626',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  textoBotonFlotante: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
});
