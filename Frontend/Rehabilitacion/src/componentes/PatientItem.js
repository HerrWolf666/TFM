import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PatientItem = ({ patient, onEdit, onDelete }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{patient.nombre}</Text>
            <Text style={styles.detail}>{`Email: ${patient.email}`}</Text>
            <Text style={styles.detail}>{`ID Doctor: ${patient.id_doctor}`}</Text>
            <View style={styles.actions}>
                <TouchableOpacity onPress={onEdit}>
                    <Text style={styles.edit}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete}>
                    <Text style={styles.delete}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginVertical: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    detail: {
        fontSize: 14,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    edit: {
        color: 'blue',
    },
    delete: {
        color: 'red',
    },
});

export default PatientItem;

