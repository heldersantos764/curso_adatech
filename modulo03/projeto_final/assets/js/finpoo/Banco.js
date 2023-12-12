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
                this.#contas[i].getCliente().getSenha() === senha
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
}

export default Banco