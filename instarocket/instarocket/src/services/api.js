import axios from 'axios';

const api = axios.create({
    // when using genymotion, the host ip is always 10.0.3.2
    baseURL: 'http://10.0.3.2:3333'
    //baseURL: 'http://192.168.0.107:3333'
});

export default api;