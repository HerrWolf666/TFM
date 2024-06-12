import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import CustomInput from '../componentes/CustomInput';
import CustomButton from '../componentes/CustomButton';
import api from '../api';
import { getToken } from '../utils/auth';

const EditPatientScreen = ({ route, navigation }) => {
  const { patientId } = route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idDoctor, setIdDoctor] = useState('');

  useEffect(() => {
    const fetchPatientDetails = async () => {
      const token = await getToken();
      try {
        const response = await api.get(`/patients/${patientId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { nombre, email, id_doctor } = response.data;
        setName(nombre);
        setEmail(email);
        setIdDoctor(id_doctor);
      } catch (error) {
        console.error('Error fetching patient details:', error);
        Alert.alert('Error', 'No se pudo obtener los detalles del paciente');
      }
    };

    fetchPatientDetails();
  }, [patientId]);

  const handleEditPatient = async () => {
    const token = await getToken();
    try {
      await api.put(`/usuarios/${patientId}`, { nombre: name, email, id_doctor: idDoctor }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Alert.alert('Éxito', 'Paciente actualizado correctamente.');
      navigation.goBack();
    } catch (error) {
      console.error('Error al actualizar el paciente:', error);
      Alert.alert('Error', 'No se pudo actualizar el paciente.');
    }
  };

  return (
    <View style={styles.container}>
      <CustomInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <CustomInput
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <CustomInput
        placeholder="ID Doctor"
        value={idDoctor}
        onChangeText={setIdDoctor}
      />
      <CustomButton title="Actualizar Paciente" onPress={handleEditPatient} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});

export default EditPatientScreen;

