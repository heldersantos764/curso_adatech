import Conta from "./Conta.js";

class ContaPoupanca extends Conta{
    constructor(){
        super()
    }

    sacar(valor){
        if (valor <= super.getSaldo()) {
            super.sacar(valor)
            return true
        }

        return false
    }
}

export default ContaPoupanca