document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para Mostrar/Esconder Senha ---
    const passwordField = document.getElementById('password');
    const toggleIcon = document.querySelector('.password-toggle-icon i');

    if (toggleIcon) {
        toggleIcon.addEventListener('click', () => {
            // Verifica se o campo é do tipo 'password'
            if (passwordField.type === 'password') {
                // Muda para 'text' (mostra a senha)
                passwordField.type = 'text';
                // Muda o ícone para "olho cortado"
                toggleIcon.classList.remove('bi-eye-fill');
                toggleIcon.classList.add('bi-eye-slash-fill');
            } else {
                // Muda de volta para 'password' (esconde a senha)
                passwordField.type = 'password';
                // Muda o ícone de volta para "olho"
                toggleIcon.classList.remove('bi-eye-slash-fill');
                toggleIcon.classList.add('bi-eye-fill');
            }
        });
    }

    // --- Lógica do Formulário (Faremos na Fase 4) ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            // Impede o comportamento padrão do formulário (que é recarregar a página)
            event.preventDefault(); 
            
            console.log("Formulário enviado! (Mas ainda não conectado ao backend)");
            
            // Aqui, na Fase 4, chamaremos o axios.
        });
    }

});