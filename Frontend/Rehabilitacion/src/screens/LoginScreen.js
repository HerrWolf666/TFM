import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../api';  
import { saveToken } from '../utils/auth'; 

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // Validación básica
        if (!email || !password) {
            Alert.alert('Error', 'Por favor, ingrese ambos email y contraseña.');
            return;
        }

        try {
            // Hacer la petición POST para iniciar sesión
            const response = await api.post('/auth/login', {
                email: email,
                password: password
            });

            // Verificar si la autenticación fue exitosa
            if (response.data.auth) {
                // Guardar el token JWT de forma segura
                await saveToken(response.data.token);

                const { user } = response.data;// Extraer el usuario de la respuesta

                // Navegar a otra pantalla segun rol usuario
                if (user.rol === 'doctor' && user.admin === 'no') {
                    navigation.navigate('DashboardDoctorScreen');
                } else if (user.rol === 'doctor' && user.admin === 'si') {
                    navigation.navigate('DashboardAdminDoctorScreen');
                } else if (user.rol === 'paciente') {
                    navigation.navigate('DashboardPacienteScreen');
                } else {
                    Alert.alert('Error', 'Rol de usuario desconocido.');
                }
            } else {
                Alert.alert('Error de inicio de sesión', 'Credenciales incorrectas');
            }
        } catch (error) {
            // Manejo de errores
            console.error('Error de inicio de sesión', error);
            Alert.alert('Error de inicio de sesión', 'Ha ocurrido un problema');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    input: {
        width: '100%',
        height: 50,
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: '#ddd',
    }
});

export default LoginScreen;
