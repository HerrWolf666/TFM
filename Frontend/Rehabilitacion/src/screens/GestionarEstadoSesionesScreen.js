import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import api from '../api';
import { getToken } from '../utils/auth';
import SessionItem from '../componentes/SessionItem';

const GestionarEstadoSesionesScreen = () => {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const fetchSessions = async () => {
            const token = await getToken();
            try {
                const response = await api.get('/sessions', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSessions(response.data);
            } catch (error) {
                console.error('Error fetching sessions', error);
            }
        };

        fetchSessions();
    }, []);

    const handleToggleCompleted = async (sessionId, currentStatus) => {
        const token = await getToken();
        try {
            await api.patch(`/sessions/${sessionId}/marcarRealizada`, null, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Actualiza el estado local para reflejar el cambio
            setSessions(sessions.map(session =>
                session.id === sessionId ? { ...session, completed: !currentStatus } : session
            ));
        } catch (error) {
            console.error('Error toggling session status', error);
            Alert.alert('Error', 'Failed to update session status.');
        }
    };

    const renderSession = ({ item }) => (
        <SessionItem
            session={item}
            onPress={() => handleToggleCompleted(item.id, item.completed)}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={sessions}
                renderItem={renderSession}
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

export default GestionarEstadoSesionesScreen;

