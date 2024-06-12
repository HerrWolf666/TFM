import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import api from '../api';
import { getToken } from '../utils/auth';
import moment from 'moment';

const AddSessionScreen = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [patientId, setPatientId] = useState('');
    const [series, setSeries] = useState([{ resultados: '' }]);
    const [patients, setPatients] = useState([]);
    const [conclusion, setConclusion] = useState('');

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const token = await getToken();
                const response = await api.get('/patients', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patients', error);
                Alert.alert('Error', 'No se pudo obtener los pacientes');
            }
        };

        fetchPatients();
    }, []);

    const handleAddSession = async () => {
        if (!date || !patientId || series.length === 0) {
            Alert.alert('Error', 'Por favor, complete todos los campos');
            return;
        }

        try {
            const token = await getToken();
            await api.post(
                '/sessions',
                {
                    fecha: moment(date).format('YYYY-MM-DD HH:mm:ss'), // Formatear la fecha correctamente
                    conclusión: conclusion || null,
                    id_paciente: patientId,
                    series: series.map((s) => s.resultados),
                    realizada: 'N',
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            Alert.alert('Éxito', 'Sesión agregada con éxito');
            navigation.goBack();
        } catch (error) {
            console.error('Error adding session', error);
            Alert.alert('Error', 'No se pudo agregar la sesión');
        }
    };

    const handleAddSeries = () => {
        setSeries([...series, { resultados: '' }]);
    };

    const handleSeriesChange = (index, value) => {
        const updatedSeries = [...series];
        updatedSeries[index].resultados = value;
        setSeries(updatedSeries);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Fecha:</Text>
            <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={styles.dateButton}>
                <Text style={styles.dateText}>{date.toDateString()}</Text>
            </TouchableOpacity>
            {isDatePickerVisible && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        const currentDate = selectedDate || date;
                        setDatePickerVisibility(false);
                        setDate(currentDate);
                    }}
                />
            )}
            <Text style={styles.label}>Paciente:</Text>
            <Picker
                selectedValue={patientId}
                onValueChange={(itemValue) => setPatientId(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Seleccionar paciente" value="" />
                {patients.map((patient) => (
                    <Picker.Item key={patient.id} label={patient.nombre} value={patient.id} />
                ))}
            </Picker>
            <Text style={styles.label}>Número de series:</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={String(series.length)}
                editable={false}
            />
            <Button title="Agregar Serie" onPress={handleAddSeries} />
            {series.map((serie, index) => (
                <View key={index}>
                    <Text style={styles.label}>Resultados de la serie {index + 1}:</Text>
                    <TextInput
                        style={styles.input}
                        value={serie.resultados}
                        onChangeText={(value) => handleSeriesChange(index, value)}
                    />
                </View>
            ))}
            <Text style={styles.label}>Conclusión:</Text>
            <TextInput
                style={styles.input}
                value={conclusion}
                onChangeText={setConclusion}
            />
            <Button title="Agregar Sesión" onPress={handleAddSession} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    dateButton: {
        padding: 10,
        backgroundColor: '#ddd',
        marginBottom: 16,
        alignItems: 'center',
    },
    dateText: {
        fontSize: 16,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
    },
});

export default AddSessionScreen;
