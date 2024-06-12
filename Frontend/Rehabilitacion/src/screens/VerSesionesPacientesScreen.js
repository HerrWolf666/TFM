import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import api from '../api';
import { getToken } from '../utils/auth';
import SessionItem from '../componentes/SessionItem';

const VerSesionesPacientesScreen = ({ navigation }) => {
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

    const renderSession = ({ item }) => (
        <SessionItem
            session={item}
            onPress={() => navigation.navigate('SessionDetailScreen', { sessionId: item.id })}
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

export default VerSesionesPacientesScreen;
