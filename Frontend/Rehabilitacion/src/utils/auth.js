import AsyncStorage from '@react-native-async-storage/async-storage';

// Guardar token
export const saveToken = async (token) => {
    try {
        await AsyncStorage.setItem('userToken', token);
    } catch (error) {
        console.error('Error al guardar el token', error);
    }
};

// Obtener token
export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        return token;
    } catch (error) {
        console.error('Error al obtener el token', error);
        return null;
    }
};
