// Evento de submissão do formulário
document.getElementById('domainForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const domainInput = document.getElementById('domain').value;
    const apiKey = 'SUA_CHAVE_API'; // Insira sua chave de API aqui
    const resultElement = document.getElementById('result');

    // Valida se o usuário digitou um domínio
    if (!domainInput) {
        resultElement.textContent = "Por favor, insira um domínio.";
        return;
    }

    // Faz a consulta à API Domainr para verificar disponibilidade
    try {
        const response = await fetch(`https://api.domainr.com/v2/status?domain=${domainInput}&client_id=${apiKey}`);
        const data = await response.json();

        // Verifica o status do domínio e exibe a disponibilidade
        if (data.status && data.status.length > 0) {
            const status = data.status[0].status;
            if (status === "inactive") {
                resultElement.textContent = `O domínio ${domainInput} está disponível!`;
            } else {
                resultElement.textContent = `O domínio ${domainInput} já está registrado.`;
            }
        } else {
            resultElement.textContent = "Não foi possível verificar a disponibilidade. Tente novamente.";
        }
    } catch (error) {
        resultElement.textContent = "Erro ao verificar o domínio. Verifique a conexão e tente novamente.";
        console.error("Erro:", error);
    }
});