const api = axios.create({
    baseURL: 'http://localhost:3001/api'
});

api.interceptors.request.use(
    (config) => {
    
        const token = localStorage.getItem('authToken');

        if (token) {
            
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        return config;
    }, 
    (error) => {

        return Promise.reject(error);
    }
);

const apiService = {
    
    /**
     * Envia o email e senha para o endpoint /login
     * @param {string} email
     * @param {string} password
     * @returns {Promise<object>}
     */
    login: async (email, password) => {
        try {
            
            const response = await api.post('/login', { email, password });
            return response.data;

        } catch (error) {

            if (error.response && error.response.data) {
                
                throw new Error(error.response.data.message);
            } else {
                
                throw new Error("Não foi possível conectar ao servidor. Tente novamente.");
            }
        }
    },

    getProfile: async () => {
        try {
            
            const response = await api.get('/profile');
            return response.data;

        } catch (error) {
            
            if (error.response && error.response.data) {
                console.error("Erro ao buscar perfil:", error.response.data.message);
                
                if(error.response.status === 400 || error.response.status === 401) {
                    localStorage.removeItem('authToken');
                    console.log("Token inválido removido do localStorage.");
                }
                throw new Error(error.response.data.message);
            } else {
                throw new Error("Erro de rede ao buscar dados do perfil.");
            }
        }
    },

    /**
     * (Não temos tela para isso, mas deixamos a lógica pronta)
     * @param {string} email
     * @param {string} password
     * @returns {Promise<object>}
     */
    register: async (email, password) => {
        try {
            const response = await api.post('/register', { email, password });
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error("Erro ao tentar registrar. Tente novamente.");
            }
        }
    }
};