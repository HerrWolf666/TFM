import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import CustomInput from '../componentes/CustomInput';
import CustomButton from '../componentes/CustomButton';
import api from '../api';
import { getToken } from '../utils/auth';

const ConfigureSystemScreen = ({ navigation }) => {
    const [config, setConfig] = useState({
        maxUsers: '',
        sessionTimeout: '',
        maintenanceMode: ''
    });

    useEffect(() => {
        const fetchConfig = async () => {
            const token = await getToken();
            try {
                const response = await api.get('/admin/config', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setConfig(response.data);
            } catch (error) {
                console.error('Error fetching config', error);
            }
        };

        fetchConfig();
    }, []);

    const handleSaveConfig = async () => {
        const token = await getToken();
        try {
            await api.put('/admin/config', config, {
                headers: { Authorization: `Bearer ${token}` }
            });
            Alert.alert('Éxito', 'Configuración guardada correctamente.');
            navigation.goBack();
        } catch (error) {
            console.error('Error saving config', error);
            Alert.alert('Error', 'No se pudo guardar la configuración.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configurar Sistema</Text>
            <CustomInput
                placeholder="Máximo de Usuarios"
                value={config.maxUsers}
                onChangeText={(value) => setConfig({ ...config, maxUsers: value })}
            />
            <CustomInput
                placeholder="Tiempo de Espera de Sesión (minutos)"
                value={config.sessionTimeout}
                onChangeText={(value) => setConfig({ ...config, sessionTimeout: value })}
            />
            <CustomInput
                placeholder="Modo de Mantenimiento (true/false)"
                value={config.maintenanceMode}
                onChangeText={(value) => setConfig({ ...config, maintenanceMode: value })}
            />
            <CustomButton title="Guardar Configuración" onPress={handleSaveConfig} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    }
});

export default ConfigureSystemScreen;
