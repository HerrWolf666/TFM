import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SessionItem = ({ session, onPress }) => {
    const { fecha, realizada, paciente_nombre, num_series } = session;
    const formattedDate = new Date(fecha).toLocaleDateString(); // Formatear fecha

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.title}>Fecha: {formattedDate}</Text>
            <Text style={styles.detail}>Estado: {realizada === 'Y' ? 'Completada' : 'Pendiente'}</Text>
            <Text style={styles.detail}>Paciente: {paciente_nombre}</Text>
            <Text style={styles.detail}>Número de series: {num_series}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginVertical: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    detail: {
        fontSize: 14,
    },
});

export default SessionItem;
