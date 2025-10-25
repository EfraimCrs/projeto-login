
document.addEventListener('DOMContentLoaded', () => {

    const passwordField = document.getElementById('password');
    const toggleIcon = document.querySelector('.password-toggle-icon i');

    if (toggleIcon) {
        toggleIcon.addEventListener('click', () => {
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                toggleIcon.classList.remove('bi-eye-fill');
                toggleIcon.classList.add('bi-eye-slash-fill');
            } else {
                passwordField.type = 'password';
                toggleIcon.classList.remove('bi-eye-slash-fill');
                toggleIcon.classList.add('bi-eye-fill');
            }
        });
    }

    const loginForm = document.getElementById('loginForm');
    const emailField = document.getElementById('email');
    
    const loginButton = loginForm.querySelector('button[type="submit"]');
    const errorAlert = document.getElementById('error-alert');

    if (loginForm) {
        
        loginForm.addEventListener('submit', async (event) => {
            
            event.preventDefault(); 
            
            const originalButtonText = loginButton.innerHTML; 
            loginButton.disabled = true;
            loginButton.innerHTML = `
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Entrando...
            `;
            
            errorAlert.classList.add('d-none');

            try {
                
                const email = emailField.value;
                const password = passwordField.value;

                const data = await apiService.login(email, password);

                console.log("Login bem-sucedido!", data);

                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                    console.log("token salvo no localStorage");
                }

                loginButton.innerHTML = "Sucesso!";
                loginButton.classList.remove('btn-login'); 
                loginButton.classList.add('btn-success'); 

                setTimeout(() => {
                    alert(`Login bem-sucedido! Bem-vindo, ${data.user.email}`);
                    
                    loginForm.reset();
                    loginButton.disabled = false;
                    loginButton.innerHTML = originalButtonText;
                    loginButton.classList.remove('btn-success');
                    loginButton.classList.add('btn-login');
                }, 1500); 

            } catch (error) {
                
                console.error("Falha no login:", error.message);
                
                errorAlert.textContent = error.message; 
                errorAlert.classList.remove('d-none');

                loginButton.disabled = false;
                loginButton.innerHTML = originalButtonText;
            }
        });
    }
});