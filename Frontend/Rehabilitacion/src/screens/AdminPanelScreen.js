import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import api from '../api';
import { getToken } from '../utils/auth';

const AdminPanelScreen = ({ navigation }) => {
    const [statistics, setStatistics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatistics = async () => {
            const token = await getToken();
            try {
                const response = await api.get('/admin/statistics', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log('Statistics response:', response.data); // Log para depurar
                setStatistics(response.data);
            } catch (error) {
                console.error('Error fetching statistics', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, []);

    const renderStatistic = ({ item }) => (
        <View style={styles.statItem}>
            <Text style={styles.statText}>{item.title}: {item.value}</Text>
        </View>
    );

    const handleConfigureSystem = () => {
        navigation.navigate('ConfigureSystemScreen');
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Cargando estadísticas...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Panel de Administración</Text>
            <FlatList
                data={statistics}
                renderItem={renderStatistic}
                keyExtractor={(item) => item.id.toString()}
            />
            <Button title="Configurar Sistema" onPress={handleConfigureSystem} />
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
    },
    statItem: {
        padding: 10,
        backgroundColor: '#fff',
        marginVertical: 8,
        borderRadius: 5,
    },
    statText: {
        fontSize: 18,
    },
});

export default AdminPanelScreen;
