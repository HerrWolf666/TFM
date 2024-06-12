import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import api from '../api';
import { getToken } from '../utils/auth';
import PatientItem from '../componentes/PatientItem';
import CustomButton from '../componentes/CustomButton';

const GestionarPacientesScreen = ({ navigation }) => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            const token = await getToken();
            console.log('Token obtenido:', token);
            try {
                const response = await api.get('/patients', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log('Respuesta de la API:', response.data);
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patients', error);
                Alert.alert('Error', 'No se pudo obtener los pacientes');
            }
        };

        fetchPatients();
    }, []);

    const handleDeletePatient = async (patientId) => {
        const token = await getToken();
        try {
            await api.delete(`/patients/${patientId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPatients(patients.filter(patient => patient.id !== patientId));
            Alert.alert('Éxito', 'Paciente eliminado correctamente.');
        } catch (error) {
            console.error('Error deleting patient', error);
            Alert.alert('Error', 'No se pudo eliminar el paciente.');
        }
    };

    const handleEditPatient = (patientId) => {
        navigation.navigate('EditPatientScreen', { patientId });
    };

    const handleAddPatient = () => {
        navigation.navigate('AddPatientScreen');
    };

    const renderPatient = ({ item }) => (
        <PatientItem
            patient={item}
            onEdit={() => handleEditPatient(item.id)}
            onDelete={() => handleDeletePatient(item.id)}
        />
    );

    return (
        <View style={styles.container}>
            <CustomButton title="Agregar Paciente" onPress={handleAddPatient} />
            <FlatList
                data={patients}
                renderItem={renderPatient}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    }
});

export default GestionarPacientesScreen;

