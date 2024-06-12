import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../componentes/CustomButton';

const DashboardDoctorScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido, Doctor</Text>
            <CustomButton
                title="Gestionar Pacientes"
                onPress={() => navigation.navigate('GestionarPacientesScreen')}
                style={styles.button}
            />
            <CustomButton
                title="Gestionar Sesiones"
                onPress={() => navigation.navigate('GestionarSesionesScreen')}
                style={styles.button}
            />
            <CustomButton
                title="Ver Sesiones de Pacientes Asignados"
                onPress={() => navigation.navigate('VerSesionesPacientesScreen')}
                style={styles.button}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        marginVertical: 10,
        width: '100%',
    },
});

export default DashboardDoctorScreen;
