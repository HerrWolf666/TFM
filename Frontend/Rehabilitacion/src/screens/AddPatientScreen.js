import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import CustomInput from '../componentes/CustomInput';
import CustomButton from '../componentes/CustomButton';
import api from '../api';
import { getToken } from '../utils/auth';

const AddPatientScreen = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [idDoctor, setIdDoctor] = useState('');

    const handleAddPatient = async () => {
        if (!nombre || !email || !password || !idDoctor) {
            Alert.alert('Error', 'Por favor, complete todos los campos.');
            return;
        }

        const token = await getToken();
        try {
            await api.post('/usuarios', { nombre, email, password, rol: 'paciente', admin: 'no', id_doctor: idDoctor }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            Alert.alert('Éxito', 'Paciente agregado correctamente.');
            navigation.goBack();
        } catch (error) {
            console.error('Error adding patient', error);
            Alert.alert('Error', 'No se pudo agregar el paciente.');
        }
    };

    return (
        <View style={styles.container}>
            <CustomInput
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <CustomInput
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
            />
            <CustomInput
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <CustomInput
                placeholder="ID Doctor"
                value={idDoctor}
                onChangeText={setIdDoctor}
            />
            <CustomButton title="Agregar Paciente" onPress={handleAddPatient} />
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

export default AddPatientScreen;