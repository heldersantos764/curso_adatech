import Conta from "./Conta.js";

class ContaCorrente extends Conta {

    #limite

    constructor() {
        super()
        this.#limite = 500
    }

    sacar(valor) {
        const saldoTotal = super.getSaldo()+this.#limite
        
        if (valor <= saldoTotal) {
            super.sacar(valor)
            return true
        }

        return false
    }

}

export default ContaCorrente