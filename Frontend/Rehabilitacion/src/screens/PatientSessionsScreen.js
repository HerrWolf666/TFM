import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import api from '../api';
import { getToken } from '../utils/auth';
import { decode } from 'base-64';

const PatientSessionsScreen = ({ navigation }) => {
    const [sessions, setSessions] = useState([]);
    const [patientId, setPatientId] = useState(null);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const token = await getToken();
                console.log('Token:', token);

                // Extraer el patientId directamente del token usando base-64
                const base64Url = token.split('.')[1];
                const decodedToken = JSON.parse(decode(base64Url));
                console.log('Decoded Token:', decodedToken);
                const userId = decodedToken.id;
                setPatientId(userId);
                console.log('Patient ID:', userId);

                const response = await api.get(`/sessions/patient/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log('Response Data:', response.data);
                setSessions(response.data);
            } catch (error) {
                console.error('Error fetching sessions', error);
                Alert.alert('Error', 'No se pudo obtener las sesiones.');
            }
        };

        fetchSessions();
    }, []);

    const markAsCompleted = async (sessionId) => {
        const token = await getToken();
        try {
            await api.put(`/sessions/markAsCompleted/${sessionId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            Alert.alert('Sesión marcada', 'La sesión ha sido marcada como realizada.');
            setSessions(sessions.map(session => 
                session.id === sessionId ? { ...session, realizada: 'Y' } : session
            ));
        } catch (error) {
            console.error('Error marking session as completed', error);
            Alert.alert('Error', 'Hubo un problema al marcar la sesión como realizada.');
        }
    };

    return (
        <View style={styles.container}>
            {sessions.map(session => (
                <View key={session.id} style={styles.session}>
                    <Text style={styles.label}>Fecha: {new Date(session.fecha).toLocaleDateString()}</Text>
                    <Text style={styles.label}>Conclusión: {session.conclusión || 'N/A'}</Text>
                    <Button 
                        title="Marcar como realizada" 
                        onPress={() => markAsCompleted(session.id)} 
                        disabled={session.realizada === 'Y'}
                    />
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    session: {
        marginBottom: 20,
        padding: 20,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default PatientSessionsScreen;

