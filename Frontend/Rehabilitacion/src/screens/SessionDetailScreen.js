import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import api from '../api';
import { getToken } from '../utils/auth';

const SessionDetailScreen = ({ route, navigation }) => {
    const { sessionId } = route.params;
    const [session, setSession] = useState(null);
    const isFocused = useIsFocused();

    const fetchSessionDetails = async () => {
        const token = await getToken();
        try {
            const response = await api.get(`/sessions/${sessionId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSession(response.data);
        } catch (error) {
            console.error('Error fetching session details', error);
            Alert.alert('Error', 'No se encontraron los detalles de la sesión.');
        }
    };

    useEffect(() => {
        if (isFocused) {
            fetchSessionDetails();
        }
    }, [isFocused]);

    const handleDelete = async () => {
        const token = await getToken();
        try {
            await api.delete(`/sessions/${sessionId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            Alert.alert('Sesión eliminada', 'La sesión ha sido eliminada exitosamente.');
            navigation.goBack();
        } catch (error) {
            console.error('Error deleting session', error);
            Alert.alert('Error', 'Hubo un problema al eliminar la sesión.');
        }
    };

    if (!session) {
        return (
            <View style={styles.container}>
                <Text>Cargando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Fecha: {new Date(session.fecha).toLocaleDateString()}</Text>
            <Text style={styles.label}>Estado: {session.realizada ? 'Completada' : 'Pendiente'}</Text>
            <Text style={styles.label}>Paciente: {session.paciente_nombre}</Text>
            <Text style={styles.label}>Número de series: {session.num_series}</Text>
            {session.series.map((serie, index) => (
                <Text key={index} style={styles.label}>Resultados de la serie {index + 1}: {serie.resultados}</Text>
            ))}
            <Text style={styles.label}>Conclusión: {session.conclusión || 'N/A'}</Text>
            <Button title="Editar" onPress={() => navigation.navigate('EditSession', { session })} />
            <Button title="Eliminar" onPress={handleDelete} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default SessionDetailScreen;
