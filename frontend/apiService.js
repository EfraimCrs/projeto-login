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
            // Agora, quando chamarmos api.get('/profile')...
            // 1. O 'interceptor' vai rodar primeiro.
            // 2. Vai pegar o token do localStorage.
            // 3. Vai adicionar 'Authorization: Bearer <token>' no cabeçalho.
            // 4. O backend vai receber o token, validar, e retornar 200 OK.
            const response = await api.get('/profile');
            return response.data;
        } catch (error) {
            // Se o token estiver expirado ou inválido, o backend retornará 400 ou 401
            if (error.response && error.response.data) {
                console.error("Erro ao buscar perfil:", error.response.data.message);
                // Se o token for inválido, podemos apagar o token "ruim"
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