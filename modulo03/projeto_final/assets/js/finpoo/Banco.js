class Banco{

    #clienteLogado
    #contas
    #temUsuarioLogado
    #ultimaContaCriada

    constructor(){
        this.#clienteLogado = null
        this.#contas = []
        this.#temUsuarioLogado = false
        this.#ultimaContaCriada = 0
    }

    logar(cliente){

    }

    sair(){
        this.#clienteLogado = null
        this.#temUsuarioLogado = false
    }

    addConta(conta){
        this.#contas.push(conta)
    }

    getConta(){
        return this.#contas
    }

    criarNumeroDeConta(){
        this.#ultimaContaCriada++
        return this.#ultimaContaCriada
    }
}

export default Banco