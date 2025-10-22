
// 1. Criamos uma 'instância' do axios.
// Isso é uma boa prática pois centraliza a URL base da nossa API.
const api = axios.create({
    baseURL: 'http://localhost:3001/api' // A porta do nosso backend
});

// 2. Criamos nosso objeto de serviço.
// O app.js vai chamar essas funções.
const apiService = {
    
    /**
     * Envia o email e senha para o endpoint /login
     * @param {string} email
     * @param {string} password
     * @returns {Promise<object>} - Os dados da resposta (ex: { message, user })
     */
    login: async (email, password) => {
        try {
            // Faz a chamada POST para {baseURL}/login
            const response = await api.post('/login', { email, password });
            
            // Se der certo (Status 200), retorna os dados
            // 'response.data' terá o JSON { message, user }
            return response.data;

        } catch (error) {
            // Se o backend retornar um erro (401, 500, etc), o axios vai 'rejeitar'
            
            // 'error.response.data' contém o JSON { message } que enviamos do backend
            if (error.response && error.response.data) {
                // Lança um novo erro com a mensagem da API (ex: "Usuário ou senha inválidos.")
                throw new Error(error.response.data.message);
            } else {
                // Erro de rede (backend desligado, etc)
                throw new Error("Não foi possível conectar ao servidor. Tente novamente.");
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