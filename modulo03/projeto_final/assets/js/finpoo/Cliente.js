class Cliente{
    #nome
    #cpf
    #dataDeNascimento
    #senha

    constructor(){
        this.#nome = ""
        this.#cpf = ""
        this.#dataDeNascimento = ""
        this.senha = ""
    }

    getNome(){
        return this.#nome
    }

    setNome(nome){
        this.#nome = nome
    }

    getCpf(){
        return this.#cpf
    }

    setCpf(cpf){
        this.cpf = cpf
    }

    getDataDeNascimento(){
        return this.#dataDeNascimento
    }

    setDataDeNascimento(dataDeNascimento){
        this.#dataDeNascimento = dataDeNascimento
    }

    setSenha(senha){
        this.senha = senha
    }

    conferirSenha(senha){
        return this.#senha === senha
    }
}

export default Cliente