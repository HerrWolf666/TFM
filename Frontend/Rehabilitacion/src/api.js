import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.2.2:3000/api',  //'localhost' a '10.0.2.2' para emulador Android
    timeout: 10000,  // Definir un timeout para las solicitudes
});

export default api;
