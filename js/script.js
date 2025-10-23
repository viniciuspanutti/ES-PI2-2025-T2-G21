// Tom

const form = document.getElementById('formbasico');


if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const dadosDoFormulario = {
            nome: document.getElementById('name').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('phone').value,
            senha: document.getElementById('password').value
        };

        const urlDoServidor = 'http://localhost:3000/cadastrar';

        fetch(urlDoServidor, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosDoFormulario)
        })
        .then(response => response.json().then(data => ({ ok: response.ok, data })))
        .then(({ ok, data }) => {
            alert(data.message); // Exibe a mensagem de sucesso ou erro do servidor
            if (ok) {
                form.reset(); // Limpa o formulário se o cadastro deu certo para nao bugar o mysql
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro de comunicação com o servidor. Tente novamente.');
        });
    });
}