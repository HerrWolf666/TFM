import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const InicioScreen = ({ navigation }) => {
    useEffect(() => {
        // Redirigir a la pantalla de login después de 3 segundos automáticamente (opcional)
        const timer = setTimeout(() => {
            navigation.navigate('LoginScreen');
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigation]);

    const handlePress = () => {
        navigation.navigate('LoginScreen');
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <View>
                <Text style={styles.title}>Bienvenido a la Aplicación de Rehabilitación</Text>
                <Text style={styles.subtitle}>Toque en cualquier lugar para continuar...</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        color: '#666',
    },
});

export default InicioScreen;

