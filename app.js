let listaDeNumerosSorteados = [];
let numeroLimite = 30;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Descubra o número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e ' + numeroLimite);
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.3});
}
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    
    if(quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)) {
        gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function configurarBotoes(ehInicioDeJogo) {
    if(ehInicioDeJogo) {
        document.getElementById('reiniciar').setAttribute('disabled', true);
        document.getElementById('chutar').removeAttribute('disabled');
    } else {
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chutar').setAttribute('disabled', true);
    }
}

function verificarChute() {
    let chute = document.querySelector('input').value; 
    
    if(chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto em ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        configurarBotoes(false);
    } else if(chute > numeroSecreto) {
        exibirTextoNaTela('p', 'O número secreto é menor');
    } else {
        exibirTextoNaTela('p', 'O número secreto é maior');
    }
    tentativas++;    
    limparCampo();
}

function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = "";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    configurarBotoes(true);
}

exibirMensagemInicial();