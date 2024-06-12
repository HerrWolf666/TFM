import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import api from '../api';
import { getToken } from '../utils/auth';
import SessionItem from '../componentes/SessionItem';
import CustomButton from '../componentes/CustomButton';

const GestionarSesionesScreen = ({ navigation }) => {
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

    const handleDeleteSession = async (sessionId) => {
        const token = await getToken();
        try {
            await api.delete(`/sessions/${sessionId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSessions(sessions.filter(session => session.id !== sessionId));
            Alert.alert('Éxito', 'Sesión eliminada correctamente.');
        } catch (error) {
            console.error('Error deleting session', error);
            Alert.alert('Error', 'No se pudo eliminar la sesión.');
        }
    };

    const handleEditSession = (sessionId) => {
        navigation.navigate('EditSessionScreen', { sessionId });
    };

    const handleAddSession = () => {
        navigation.navigate('AddSessionScreen');
    };

    const renderSession = ({ item }) => (
        <SessionItem
            session={item}
            onEdit={() => handleEditSession(item.id)}
            onDelete={() => handleDeleteSession(item.id)}
        />
    );

    return (
        <View style={styles.container}>
            <CustomButton title="Agregar Sesión" onPress={handleAddSession} />
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

export default GestionarSesionesScreen;
