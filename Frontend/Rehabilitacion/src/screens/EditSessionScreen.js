import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../api';
import { getToken } from '../utils/auth';

const EditSessionScreen = ({ route, navigation }) => {
    const { session } = route.params;
    const [fecha, setFecha] = useState(new Date(session.fecha));
    const [conclusion, setConclusion] = useState(session.conclusion || '');
    const [detalles, setDetalles] = useState(session.series.map(serie => serie.resultados) || []);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleSave = async () => {
        const token = await getToken();
        try {
            await api.put(`/sessions/${session.id}`, {
                id_paciente: session.id_paciente,
                fecha: fecha.toISOString(),
                conclusion,
                detalles: detalles.map((detalle) => ({ resultados: detalle }))
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            Alert.alert('Sesión actualizada', 'La sesión ha sido actualizada exitosamente.');
            navigation.goBack();
        } catch (error) {
            console.error('Error updating session', error);
            Alert.alert('Error', 'Hubo un problema al actualizar la sesión.');
        }
    };

    const addDetail = () => {
        setDetalles([...detalles, '']);
    };

    const updateDetail = (index, value) => {
        const newDetails = [...detalles];
        newDetails[index] = value;
        setDetalles(newDetails);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Fecha:</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={styles.dateText}>{fecha.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={fecha}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        const currentDate = selectedDate || fecha;
                        setShowDatePicker(false);
                        setFecha(currentDate);
                    }}
                />
            )}
            <Text style={styles.label}>Detalles:</Text>
            {detalles.map((detalle, index) => (
                <TextInput
                    key={index}
                    style={styles.input}
                    value={detalle}
                    onChangeText={(value) => updateDetail(index, value)}
                />
            ))}
            <Button title="Agregar detalle" onPress={addDetail} />
            <Text style={styles.label}>Conclusión:</Text>
            <TextInput style={styles.input} value={conclusion} onChangeText={setConclusion} />
            <Button title="Guardar" onPress={handleSave} />
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
    dateText: {
        fontSize: 18,
        marginBottom: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
    },
    input: {
        fontSize: 18,
        marginBottom: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
    },
});

export default EditSessionScreen;
