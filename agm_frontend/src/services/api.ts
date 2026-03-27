import axios from 'axios';

// Aqui o React lê o seu ficheiro .env através do comando import.meta.env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;