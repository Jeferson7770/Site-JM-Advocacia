// Função de máscara de telefone
document.getElementById("telefone").addEventListener("input", function(e) {
    let telefone = e.target.value.replace(/\D/g, "");
    telefone = telefone.replace(/^(\d{2})(\d)/g, "($1) $2");
    telefone = telefone.replace(/(\d{5})(\d)/, "$1-$2");
    telefone = telefone.substring(0, 15);
    e.target.value = telefone;
});

document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();

    // Pega os valores
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (nome === "") {
        alert("Por favor, preencha o seu nome.");
        return;
    }

    if (email === "") {
        alert("Por favor, preencha o seu e-mail.");
        return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValido.test(email)) {
        alert("Por favor, insira um e-mail válido.");
        return;
    }

    if (mensagem === "") {
        alert("Por favor, escreva sua mensagem.");
        return;
    }

    alert("Formulário enviado com sucesso! Logo entraremos em contato.");
    this.submit();
});