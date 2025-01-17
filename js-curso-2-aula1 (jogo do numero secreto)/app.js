//let titulo = document.querySelector('h1');     //document --> seleciona o documento do html e query --> seleciona algo especifico dentro do documento.
//titulo.innerHTML = 'Dúvido você acertar o número';

//let paragrafo = document.querySelector('p');
 //paragrafo.innerHTML = 'Escolha um número de 1 a 10';

let listaDeNumerosSorteados = [];
let numerolimite = 10;
let numeroSecreto = gerarNumeroAleatorio();

console.log(numeroSecreto);
let tentativa = 1;


 function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
    //responsiveVoice.speak (texto, 'Brazilian Portuguese Female', {rate:1.3}); --> biblioteca inserida no html na linha 7
 }

 function mensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número de 1 a 10');
 }
 mensagemInicial();

 function verificarChute() {
    let chute = document.querySelector('input').value;
    console.log(chute == numeroSecreto);
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertouuuuu miseravi');
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        let mensagem = 'Você acertou com ' + tentativa + ' ' + palavraTentativa;
        exibirTextoNaTela('p', mensagem);
        document.getElementById('reiniciar').removeAttribute('disabled');

    }else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'o número secreto é menor');
        }else{
            exibirTextoNaTela('p', 'o número secreto é maior');
        }
        tentativa++
        limparCampo()
    }
}

function gerarNumeroAleatorio(){
    //return parseInt(Math.random()*10 +1);
    let numeroEscolhido = parseInt(Math.random()*numerolimite +1); //memorizar o numero escolhido
    let quantElementos = listaDeNumerosSorteados.length;

    if (quantElementos == numerolimite){ //condição para esvaziar lista
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { //incluir o numero escolhido dentro da lista
        return gerarNumeroAleatorio(); // gerar um novo número se ele já estiver incluido na lista
    }else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativa = 1;
    //exibirTextoNaTela('h1', 'Jogo do número secreto');
    //exibirTextoNaTela('p', 'Escolha um número de 1 a 10');
    mensagemInicial()
    document.getElementById('reiniciar').setAttribute('disabled', true);
    console.log(numeroSecreto);

}
