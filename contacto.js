document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const assunto = document.getElementById("assunto");
    const mensagem = document.getElementById("mensagem");

    const erroNome = document.getElementById("erro-nome");
    const erroEmail = document.getElementById("erro-email");
    const erroAssunto = document.getElementById("erro-assunto");
    const erroMensagem = document.getElementById("erro-mensagem");
    const success = document.getElementById("contact-success");

    function validarEmail(valor) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
    }

    function validarNome(valor) {
        // apenas letras (maiúsculas/minúsculas) e espaços
        return /^[A-Za-zÀ-ÿ\s]+$/.test(valor);
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let valido = true;

        [erroNome, erroEmail, erroAssunto, erroMensagem].forEach(function (el) {
            if (el) el.style.display = "none";
        });
        if (success) success.style.display = "none";

        // Nome: obrigatório e só letras
        const nomeValor = nome.value.trim();
        if (!nomeValor || !validarNome(nomeValor)) {
            if (erroNome) {
                erroNome.textContent = "O nome só pode conter letras e espaços.";
                erroNome.style.display = "block";
            }
            valido = false;
        }

        // Email: obrigatório e formato com @
        const emailValor = email.value.trim();
        if (!emailValor || !validarEmail(emailValor)) {
            if (erroEmail) erroEmail.style.display = "block";
            valido = false;
        }

        // Assunto: tem de escolher alguma opção
        if (!assunto.value) {
            if (erroAssunto) erroAssunto.style.display = "block";
            valido = false;
        }

        // Mensagem: mínimo 10 caracteres
        const msgValor = mensagem.value.trim();
        if (!msgValor || msgValor.length < 10) {
            if (erroMensagem) erroMensagem.style.display = "block";
            valido = false;
        }

        if (!valido) return;

        if (success) success.style.display = "block";
        form.reset();
    });
});