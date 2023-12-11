class Conta{
    #cliente
    #agencia
    #conta
    #saldo

    constructor(){
        this.#cliente = ''
        this.#agencia = ''
        this.#conta = ''
        this.#saldo = 0
    }

    getCliente(){
        return this.#cliente
    }

    setCliente(cliente){
        this.cliente = cliente
    }

    getAgencia(){
        return this.#agencia
    }

    getConta(){
        return this.#conta
    }

    getSaldo(){
        return this.#saldo
    }

    depositar(valor){
        this.#saldo += valor
    }

    sacar(valor){
        this.#saldo -= valor
    }
}

export default Conta