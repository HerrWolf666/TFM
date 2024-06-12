import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DashboardPacienteScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido al Dashboard del Paciente</Text>
            <Button
                title="Ver mis sesiones"
                onPress={() => navigation.navigate('PatientSessions')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default DashboardPacienteScreen;

