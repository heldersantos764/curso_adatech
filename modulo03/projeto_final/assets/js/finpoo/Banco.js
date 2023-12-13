class Banco {

    #idClienteLogado
    #contas
    #ultimaContaCriada

    constructor() {
        this.#idClienteLogado = null
        this.#contas = []
        this.#ultimaContaCriada = 0
    }

    logar(cpf, senha) {
        for (let i = 0; i < this.#contas.length; i++) {
            if (
                this.#contas[i].getCliente().getCpf() === cpf &&
                this.#contas[i].getCliente().conferirSenha(senha)
            ) {
                this.#idClienteLogado = i

                return true
            }
        }
        return false;
    }

    sair() {
        this.#idClienteLogado = null
    }

    addConta(conta) {
        if (this.#buscarContaPorCpf(conta.getCliente().getCpf()) === null) {
            this.#contas.push(conta)
            return true
        }
        return false;
    }

    #buscarContaPorCpf(cpf) {
        for (let i = 0; i < this.#contas.length; i++) {
            if (this.#contas[i].getCliente().getCpf() === cpf) {
                return this.#contas[i];
            }
        }
        return null;
    }

    getConta() {
        return this.#contas[this.#idClienteLogado]
    }

    criarNumeroDeConta() {
        this.#ultimaContaCriada++
        return this.#ultimaContaCriada
    }

    #converterParaFloat(valor) {
        return parseFloat(valor.slice(3).replace('.', '').replace(',', '.'));
    }

    depositar(valor) {
        const valorConvertido = this.#converterParaFloat(valor)

        if (!isNaN(valorConvertido) && valorConvertido > 0) {
            this.#contas[this.#idClienteLogado].depositar(valorConvertido)
            return true
        }

        return false
    }

    sacar(valor, senha) {

        const cliente = this.#contas[this.#idClienteLogado].getCliente()
        const valorConvertido = this.#converterParaFloat(valor)

        if (
            !isNaN(valorConvertido) &&
            cliente.conferirSenha(senha) &&
            valorConvertido > 0
        ) {
            return this.#contas[this.#idClienteLogado].sacar(valorConvertido)
        }

        return false
    }

    transferir(valor, agencia, conta, senha) {
        const contaOrigem = this.#contas[this.#idClienteLogado]
        const valorConvertido = this.#converterParaFloat(valor)

        if (
            parseInt(conta) === contaOrigem.getConta() ||
            !contaOrigem.getCliente().conferirSenha(senha)
        ) {
            return false
        }

        for (let i = 0; i < this.#contas.length; i++) {
            if (
                this.#contas[i].getConta() === parseInt(conta) &&
                this.#contas[i].getAgencia() === agencia &&
                valorConvertido > 0
            ) {

                this.#contas[this.#idClienteLogado].sacar(valorConvertido)
                this.#contas[i].depositar(valorConvertido)

                return true;
            }
        }

        return false
    }
}

export default Banco