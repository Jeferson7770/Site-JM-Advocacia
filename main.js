document.addEventListener('DOMContentLoaded', function () {
    // === Máscara de telefone (fixo e celular) ===
    const telInput = document.getElementById('telefone');
    if (telInput) {
        telInput.addEventListener('input', function (e) {
            let telefone = e.target.value.replace(/\D/g, '');
            if (telefone.length <= 10) {
                telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2');
                telefone = telefone.replace(/(\d{4})(\d)/, '$1-$2');
            } else {
                telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2');
                telefone = telefone.replace(/(\d{5})(\d)/, '$1-$2');
            }
            e.target.value = telefone.substring(0, 15);
        });
    }

    // === Funções de validação ===
    function mostrarErro(campo, mensagem) {
        const erro = campo.nextElementSibling;
        if (erro) erro.textContent = mensagem;
        campo.classList.add('is-invalid');
    }
    function limparErro(campo) {
        const erro = campo.nextElementSibling;
        if (erro) erro.textContent = '';
        campo.classList.remove('is-invalid');
    }

    // === Validação e envio (front-end) ===
    const form = document.getElementById('formContato');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const telefone = document.getElementById('telefone');
            const mensagem = document.getElementById('mensagem');
            let valido = true;

            if (nome.value.trim() === '') { mostrarErro(nome, 'Por favor, preencha o seu nome.'); valido = false; } else { limparErro(nome); }
            if (email.value.trim() === '') { mostrarErro(email, 'Por favor, preencha o seu e-mail.'); valido = false; }
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { mostrarErro(email, 'Por favor, insira um e-mail válido.'); valido = false; }
            else { limparErro(email); }
            if (telefone.value.trim() !== '' && telefone.value.trim().length < 14) { mostrarErro(telefone, 'Por favor, insira um telefone válido.'); valido = false; } else { limparErro(telefone); }
            if (mensagem.value.trim() === '') { mostrarErro(mensagem, 'Por favor, escreva sua mensagem.'); valido = false; } else { limparErro(mensagem); }

            if (valido) {
                alert('Formulário enviado com sucesso! Logo entraremos em contato.');
                form.submit();
            }
        });
    }

    // === Fecha menu mobile ao clicar em qualquer link do menu ===
    const navbarCollapse = document.getElementById('menu-navegacao');
    // Delegação de evento para pegar cliques em links do menu (mesmo que sejam adicionados depois)
    document.addEventListener('click', function (e) {
        const linkMenu = e.target.closest('.navbar-nav .nav-link, .dropdown-item');
        if (!linkMenu || !navbarCollapse) return;

        // Só fecha se o toggler estiver visível (modo mobile)
        const toggler = document.querySelector('.navbar-toggler');
        const togglerVisivel = toggler && window.getComputedStyle(toggler).display !== 'none';
        if (togglerVisivel && navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse, { toggle: false });
            bsCollapse.hide();
        }
    });
});