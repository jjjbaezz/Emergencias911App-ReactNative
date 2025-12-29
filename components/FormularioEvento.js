// COMPONENTE: FORMULARIO DE EVENTO
// ============================================
// Desarrollado por: [TU MATRICULA] - [TU NOMBRE COMPLETO]
// Este componente permite crear un nuevo evento de emergencia
// ============================================

// IMPORTACIONES - Componentes y herramientas necesarias
import React, { useState } from 'react'; // React y hook useState
import { 
  StyleSheet,      // Para crear estilos
  View,            // Contenedor básico
  Text,            // Para mostrar texto
  TextInput,       // Campo de entrada de texto
  TouchableOpacity,// Botón táctil
  Image,           // Para mostrar imágenes
  ScrollView,      // Para scroll cuando el contenido es largo
  Alert            // Para mostrar alertas/mensajes
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Para tomar/seleccionar fotos

// COMPONENTE PRINCIPAL DEL FORMULARIO
// Recibe dos funciones como props: onGuardar (para guardar) y onCancelar (para cancelar)
export default function FormularioEvento({ onGuardar, onCancelar }) {
  
  // ============================================
  // ESTADOS - Variables que controlan el formulario
  // ============================================
  
  // Estado para la fecha (inicia con la fecha de hoy en formato español)
  const [fecha, setFecha] = useState(new Date().toLocaleDateString('es-DO'));
  
  // Estado para el título del evento (inicia vacío)
  const [titulo, setTitulo] = useState('');
  
  // Estado para la descripción del evento (inicia vacío)
  const [descripcion, setDescripcion] = useState('');
  
  // Estado para guardar la URI (ruta) de la foto seleccionada (inicia en null)
  // Estado para guardar la URI (ruta) de la foto seleccionada (inicia en null)
  const [foto, setFoto] = useState(null);

  // ============================================
  // FUNCIÓN: SELECCIONAR FOTO DE LA GALERÍA
  // ============================================
  // Permite al usuario elegir una foto de su galería
  const seleccionarFoto = async () => { // async porque esperamos respuestas
    // Primero pedimos permiso para acceder a la galería
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    // Si el usuario dio permiso...
    if (permiso.granted) {
      // Abrimos el selector de imágenes
      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Solo imágenes
        allowsEditing: true,    // Permite editar/recortar
        aspect: [4, 3],         // Aspecto 4:3
        quality: 0.5,           // Calidad media (para no ocupar mucho espacio)
      });

      // Si el usuario seleccionó una foto (no canceló)...
      if (!resultado.canceled) {
        // Guardamos la ruta de la foto en el estado
        setFoto(resultado.assets[0].uri);
      }
    } else {
      // Si no dio permiso, mostramos una alerta
      Alert.alert('Permiso Denegado', 'Necesitamos acceso a tus fotos');
    }
  };

  // ============================================
  // FUNCIÓN: TOMAR FOTO CON LA CÁMARA
  // ============================================
  // Permite al usuario tomar una foto con la cámara
  const tomarFoto = async () => { // async porque esperamos respuestas
    // Pedimos permiso para usar la cámara
    const permiso = await ImagePicker.requestCameraPermissionsAsync();
    
    // Si el usuario dio permiso...
    if (permiso.granted) {
      // Abrimos la cámara
      const resultado = await ImagePicker.launchCameraAsync({
        allowsEditing: true,  // Permite editar la foto tomada
        aspect: [4, 3],       // Aspecto 4:3
        quality: 0.5,         // Calidad media
      });

      // Si el usuario tomó una foto (no canceló)...
      if (!resultado.canceled) {
        // Guardamos la ruta de la foto en el estado
        setFoto(resultado.assets[0].uri);
      }
    } else {
      // Si no dio permiso, mostramos una alerta
      Alert.alert('Permiso Denegado', 'Necesitamos acceso a la cámara');
    }
  };

  // ============================================
  // FUNCIÓN: GUARDAR EL EVENTO
  // ============================================
  // Valida los datos y guarda el evento
  const handleGuardar = () => {
    // VALIDACIÓN 1: Verificamos que haya un título
    if (!titulo.trim()) { // .trim() quita espacios en blanco
      Alert.alert('Error', 'El título es obligatorio');
      return; // Salimos de la función si no hay título
    }

    // VALIDACIÓN 2: Verificamos que haya descripción
    if (!descripcion.trim()) {
      Alert.alert('Error', 'La descripción es obligatoria');
      return; // Salimos si no hay descripción
    }

    // VALIDACIÓN 3: Verificamos que haya una foto
    if (!foto) {
      Alert.alert('Error', 'Debes agregar una foto del evento');
      return; // Salimos si no hay foto
    }

    // Si todas las validaciones pasaron, creamos el objeto del evento
    const nuevoEvento = {
      fecha,        // La fecha del evento
      titulo,       // El título del evento
      descripcion,  // La descripción del evento
      foto          // La ruta de la foto
    };

    // Llamamos a la función onGuardar (que viene desde App.js) y le pasamos el evento
    onGuardar(nuevoEvento);
  };

  // ============================================
  // RENDER - Interfaz visual del formulario
  // ============================================
  return (
    <View style={styles.container}> {/* Contenedor principal */}
      
      {/* ============================================ */}
      {/* HEADER - Encabezado rojo con título */}
      {/* ============================================ */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📝 Nuevo Evento 911</Text>
        <Text style={styles.headerSubtitle}>Registro de Emergencia</Text>
      </View>

      {/* ScrollView permite scroll si el contenido es muy largo */}
      <ScrollView style={styles.scrollView}>
        
        {/* ============================================ */}
        {/* CAMPO: FECHA */}
        {/* ============================================ */}
        <View style={styles.campo}>
          <Text style={styles.label}>📅 Fecha</Text>
          <TextInput
            style={styles.input}       // Estilo del input
            value={fecha}               // Valor actual del estado
            onChangeText={setFecha}     // Cuando cambia, actualiza el estado
            placeholder="DD/MM/AAAA"    // Texto de ejemplo
          />
        </View>

        {/* ============================================ */}
        {/* CAMPO: TÍTULO */}
        {/* ============================================ */}
        <View style={styles.campo}>
          <Text style={styles.label}>📝 Título del Evento</Text>
          <TextInput
            style={styles.input}
            value={titulo}                           // Valor del estado titulo
            onChangeText={setTitulo}                 // Actualiza titulo cuando escribe
            placeholder="Ej: Accidente de tránsito"  // Placeholder de ejemplo
          />
        </View>

        {/* ============================================ */}
        {/* CAMPO: DESCRIPCIÓN */}
        {/* ============================================ */}
        <View style={styles.campo}>
          <Text style={styles.label}>🗒️ Descripción</Text>
          <TextInput
            style={[styles.input, styles.textArea]}  // Aplicamos dos estilos
            value={descripcion}                       // Valor del estado descripcion
            onChangeText={setDescripcion}             // Actualiza descripcion
            placeholder="Describe lo ocurrido..."     // Placeholder
            multiline                                 // Permite múltiples líneas
            numberOfLines={4}                         // 4 líneas visibles
          />
        </View>

        {/* ============================================ */}
        {/* CAMPO: FOTO */}
        {/* ============================================ */}
        <View style={styles.campo}>
          <Text style={styles.label}>📸 Foto del Evento</Text>
          
          {/* Contenedor de botones para tomar/seleccionar foto */}
          <View style={styles.botonesContainer}>
            {/* Botón para tomar foto con la cámara */}
            <TouchableOpacity style={styles.botonFoto} onPress={tomarFoto}>
              <Text style={styles.textoBotonFoto}>📷 Tomar Foto</Text>
            </TouchableOpacity>
            
            {/* Botón para seleccionar de la galería */}
            <TouchableOpacity style={styles.botonFoto} onPress={seleccionarFoto}>
              <Text style={styles.textoBotonFoto}>🖼️ Galería</Text>
            </TouchableOpacity>
          </View>

          {/* Si hay una foto seleccionada, la mostramos */}
          {foto && (
            <Image source={{ uri: foto }} style={styles.imagenPrevia} />
          )}
        </View>

        {/* ============================================ */}
        {/* BOTONES DE ACCIÓN */}
        {/* ============================================ */}
        <View style={styles.botonesAccion}>
          {/* Botón para cancelar y volver */}
          <TouchableOpacity 
            style={[styles.boton, styles.botonCancelar]} 
            onPress={onCancelar}  // Llama a la función onCancelar de App.js
          >
            <Text style={styles.textoBoton}>❌ Cancelar</Text>
          </TouchableOpacity>

          {/* Botón para guardar el evento */}
          <TouchableOpacity 
            style={[styles.boton, styles.botonGuardar]} 
            onPress={handleGuardar}  // Llama a nuestra función handleGuardar
          >
            <Text style={styles.textoBoton}>💾 Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// ============================================
// ESTILOS - Diseño visual del formulario
// ============================================
const styles = StyleSheet.create({
  // Contenedor principal (toda la pantalla)
  container: {
    flex: 1,              // Ocupa toda la altura disponible
    backgroundColor: '#fff', // Fondo blanco
  },
  
  // Encabezado rojo superior
  header: {
    backgroundColor: '#dc2626', // Rojo intenso
    padding: 20,                // Espaciado interno
    paddingTop: 50,             // Extra arriba para la barra de estado
  },
  
  // Título del header
  headerTitle: {
    fontSize: 24,      // Tamaño grande
    fontWeight: 'bold', // Texto en negrita
    color: '#fff',     // Texto blanco
  },
  
  // Subtítulo del header
  headerSubtitle: {
    fontSize: 14,   // Tamaño pequeño
    color: '#fff',  // Texto blanco
    marginTop: 5,   // Separación arriba
  },
  
  // Área con scroll
  scrollView: {
    flex: 1,      // Ocupa el espacio restante
    padding: 20,  // Espaciado interno
  },
  
  // Contenedor de cada campo del formulario
  campo: {
    marginBottom: 20, // Espacio entre campos
  },
  
  // Etiqueta de cada campo
  label: {
    fontSize: 16,      // Tamaño mediano
    fontWeight: 'bold', // En negrita
    marginBottom: 8,   // Espacio debajo
    color: '#333',     // Gris oscuro
  },
  
  // Campo de entrada de texto
  input: {
    borderWidth: 1,       // Borde de 1px
    borderColor: '#ddd',  // Borde gris claro
    borderRadius: 8,      // Esquinas redondeadas
    padding: 12,          // Espaciado interno
    fontSize: 16,         // Tamaño de letra
    backgroundColor: '#fff', // Fondo blanco
  },
  
  // Estilo adicional para el área de texto (descripción)
  textArea: {
    height: 100,              // Altura fija de 100px
    textAlignVertical: 'top', // Texto empieza arriba
  },
  
  // Contenedor de botones de foto
  botonesContainer: {
    flexDirection: 'row', // Botones en fila horizontal
    gap: 10,              // Espacio entre botones
    marginBottom: 10,     // Espacio debajo
  },
  
  // Botón de foto (tomar/galería)
  botonFoto: {
    flex: 1,                  // Ocupan el mismo espacio
    backgroundColor: '#3b82f6', // Azul
    padding: 12,              // Espaciado interno
    borderRadius: 8,          // Esquinas redondeadas
    alignItems: 'center',     // Centrar contenido
  },
  
  // Texto de los botones de foto
  textoBotonFoto: {
    color: '#fff',      // Blanco
    fontWeight: 'bold', // Negrita
  },
  
  // Imagen de previsualización
  imagenPrevia: {
    width: '100%',    // Ancho completo
    height: 200,      // Altura fija
    borderRadius: 8,  // Esquinas redondeadas
    marginTop: 10,    // Espacio arriba
  },
  
  // Contenedor de botones de acción (cancelar/guardar)
  botonesAccion: {
    flexDirection: 'row', // En fila horizontal
    gap: 10,              // Espacio entre botones
    marginTop: 20,        // Espacio arriba
    marginBottom: 40,     // Espacio abajo
  },
  
  // Estilo base de botón
  boton: {
    flex: 1,            // Mismo tamaño
    padding: 15,        // Espaciado interno
    borderRadius: 8,    // Esquinas redondeadas
    alignItems: 'center', // Centrar texto
  },
  
  // Botón de cancelar (gris)
  botonCancelar: {
    backgroundColor: '#6b7280', // Gris
  },
  
  // Botón de guardar (verde)
  botonGuardar: {
    backgroundColor: '#16a34a', // Verde
  },
  
  // Texto de los botones de acción
  textoBoton: {
    color: '#fff',      // Blanco
    fontWeight: 'bold', // Negrita
    fontSize: 16,       // Tamaño mediano
  },
});
