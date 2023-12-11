class Validacoes {
    static isCPF(cpf) {
        // Remover caracteres não numéricos
        cpf = cpf.replace(/[^\d]/g, '');

        // Verificar se o CPF possui 11 dígitos
        if (cpf.length !== 11) {
            return false;
        }

        // Verificar se todos os dígitos são iguais (caso contrário, não seria um CPF válido)
        if (/^(\d)\1+$/.test(cpf)) {
            return false;
        }

        // Calcular e verificar os dígitos verificadores
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }

        let resto = soma % 11;
        let digito1 = resto < 2 ? 0 : 11 - resto;

        if (parseInt(cpf.charAt(9)) !== digito1) {
            return false;
        }

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }

        resto = soma % 11;
        let digito2 = resto < 2 ? 0 : 11 - resto;

        return parseInt(cpf.charAt(10)) === digito2;
    }

    static isNome(nome) {
        const regraRegex = /^[a-zA-Z\s]+$/;
        return regraRegex.test(nome);
    }

    static isNumero(numero) {
        return !isNaN(numero)
    }

    static isDataDeNascimento(data) {
        const regraRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        const dataValida =  regraRegex.test(data);

        if (!dataValida) {
            return false
        }

        const dataDeNascimento = new Date(data);
        const dataAtual = new Date();
        const diferencaAnos = dataAtual.getFullYear() - dataDeNascimento.getFullYear();
        return diferencaAnos >= 18;
    }
}

export default Validacoes