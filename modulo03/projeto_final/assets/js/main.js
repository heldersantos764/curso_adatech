import Banco from "./finpoo/Banco.js"
import Validacoes from "./finpoo/Validacoes.js"
import Cliente from "./finpoo/Cliente.js"
import ContaCorrente from "./finpoo/ContaCorrente.js"
import ContaPoupanca from "./finpoo/ContaPoupanca.js"

const formCadastro = document.querySelector('#form-cadastro')
const formLogin = document.querySelector('#form-login')
const botoesMenuUsuario = document.getElementsByClassName('link-menu-usuario')
const banco = new Banco()



const validarCadastro = (dados) => {
    let mensagemErro = null;

    if (!Validacoes.isNome(dados.nome)) {
        mensagemErro = "Nome Inválido"
    } else if (!Validacoes.isCPF(dados.cpf)) {
        mensagemErro = "CPF inválido"
    } else if (!Validacoes.isDataDeNascimento(dados.dataNascimento)) {
        mensagemErro = "Data de Nascimento inválida ou pessoa menor de idade"
    } else if (!Validacoes.tamanhoMinimo(8, dados.senha)) {
        mensagemErro = "A senha deve conter no mínimo 8 caracteres"
    } else if (!Validacoes.comprarStrings(dados.senha, dados.confirmarSenha)) {
        mensagemErro = "Senha informada não conferem"
    }

    return mensagemErro
}


/**
 * retorna os dados dos formulários
 * @param {*} form 
 * @returns 
 */
const getDataFormulario = (form) => {
    const elementosDoFormulario = form.elements

    const dadosDoFormulario = {}

    for (var i = 0; i < elementosDoFormulario.length; i++) {
        var elemento = elementosDoFormulario[i]

        if (elemento.name) {
            dadosDoFormulario[elemento.name] = elemento.value
        }
    }

    return dadosDoFormulario
}

function abrirModal(id) {
    var modal = new bootstrap.Modal(document.getElementById(id));
    modal.show();
}


formCadastro.addEventListener('submit', e => {
    e.preventDefault()
    const dados = getDataFormulario(formCadastro)

    let erroValidacao = validarCadastro(dados)

    if (erroValidacao === null) {
        const numeroConta = banco.criarNumeroDeConta()
        const cliente = new Cliente()
        cliente.setNome(dados.nome)
        cliente.setCpf(dados.cpf)
        cliente.setDataDeNascimento(dados.dataNascimento)
        cliente.setSenha(dados.senha)
        let agencia;
        let cadastrou;

        if (dados.tipoConta === 'corrente') {
            const contaCorrente = new ContaCorrente()
            contaCorrente.setConta(numeroConta)
            contaCorrente.setCliente(cliente)
            agencia = contaCorrente.getAgencia()
            cadastrou = banco.addConta(contaCorrente)
        } else {
            const contaPoupanca = new ContaPoupanca()
            contaPoupanca.setConta(numeroConta)
            contaPoupanca.setCliente(cliente)
            agencia = contaPoupanca.getAgencia()
            cadastrou = banco.addConta(contaPoupanca)
        }


        if (cadastrou) {
            Swal.fire({
                title: "Atenção",
                html: `<div>Conta criada com sucesso!<div> <strong class="text-success">Agencia: ${agencia} - Conta: ${numeroConta}</strong>`,
                icon: "success",
                allowOutsideClick: false
            });
        } else {
            Swal.fire({
                title: "Atenção",
                text: "CPF já cadastrado!",
                icon: "error"
            });
        }

        formCadastro.reset()
    } else {
        Swal.fire({
            title: "Atenção",
            text: erroValidacao,
            icon: "error"
        });
    }

})

formLogin.addEventListener('submit', e => {
    e.preventDefault()

    const dados = getDataFormulario(formLogin)

    const loginEfetuado = banco.logar(dados.cpf, dados.senha)

    if (loginEfetuado) {
        abrirModal('area-usuario')
    } else {
        Swal.fire({
            title: "Atenção",
            text: "CPF o senha incorreta.",
            icon: "error"
        });
    }

})

abrirModal('area-usuario')

for(const item of botoesMenuUsuario){
    item.addEventListener('click', e => {
        e.preventDefault()
        const idModal = e.target.getAttribute('id-modal')
        abrirModal(idModal)
    })
}