import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InicioScreen from '../screens/InicioScreen';
import LoginScreen from '../screens/LoginScreen';
import DashboardPacienteScreen from '../screens/DashboardPacienteScreen';
import VerSesionesScreen from '../screens/VerSesionesScreen';
import GestionarEstadoSesionesScreen from '../screens/GestionarEstadoSesionesScreen';
import GestionarPacientesScreen from '../screens/GestionarPacientesScreen';
import PatientSessionsScreen from '../screens/PatientSessionsScreen';
import AddPatientScreen from '../screens/AddPatientScreen';
import EditPatientScreen from '../screens/EditPatientScreen';
import GestionarSesionesScreen from '../screens/GestionarSesionesScreen';
import AddSessionScreen from '../screens/AddSessionScreen';
import EditSessionScreen from '../screens/EditSessionScreen';
import VerSesionesPacientesScreen from '../screens/VerSesionesPacientesScreen';
import SessionDetailScreen from '../screens/SessionDetailScreen';
import AdminPanelScreen from '../screens/AdminPanelScreen';
import ConfigureSystemScreen from '../screens/ConfigureSystemScreen';
import DashboardDoctorScreen from '../screens/DashboardDoctorScreen';
import DashboardAdminDoctorScreen from '../screens/DashboardAdminDoctorScreen';

const Stack = createStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="InicioScreen">
                <Stack.Screen name="InicioScreen" component={InicioScreen} options={{ headerShown: false }} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="DashboardPacienteScreen" component={DashboardPacienteScreen} options={{ headerShown: false }} />
                <Stack.Screen name="VerSesionesScreen" component={VerSesionesScreen} options={{ headerShown: false }} />
                <Stack.Screen name="GestionarEstadoSesionesScreen" component={GestionarEstadoSesionesScreen} options={{ headerShown: false }} />
                <Stack.Screen name="GestionarPacientesScreen" component={GestionarPacientesScreen} options={{ headerShown: false }} />
                <Stack.Screen name="PatientSessions" component={PatientSessionsScreen} />
                <Stack.Screen name="AddPatientScreen" component={AddPatientScreen} options={{ headerShown: false }} />
                <Stack.Screen name="EditPatientScreen" component={EditPatientScreen} options={{ headerShown: false }} />
                <Stack.Screen name="GestionarSesionesScreen" component={GestionarSesionesScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AddSessionScreen" component={AddSessionScreen} options={{ headerShown: false }} />
                <Stack.Screen name="EditSessionScreen" component={EditSessionScreen} options={{ headerShown: false }} />
                <Stack.Screen name="EditSession" component={EditSessionScreen} />
                <Stack.Screen name="VerSesionesPacientesScreen" component={VerSesionesPacientesScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SessionDetailScreen" component={SessionDetailScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AdminPanelScreen" component={AdminPanelScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ConfigureSystemScreen" component={ConfigureSystemScreen} options={{ headerShown: false }} />
                <Stack.Screen name="DashboardDoctorScreen" component={DashboardDoctorScreen} options={{ headerShown: false }} />
                <Stack.Screen name="DashboardAdminDoctorScreen" component={DashboardAdminDoctorScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;


