// Variaveis do jogo
var jogo = {
    usuario1: '',
    usuario1Ganhou: 0,
    usuario2Ganhou: 0,
    usuario2: '',
    jogadorDaVez: '',
    jogadas: 1
};

var modalComeco = document.getElementById("modal-comeco");
var modalEstatisticas = document.getElementById("modal-estatisticas");
var modalAlterarJogadores = document.getElementById("modal-alterar-jogadores");
var fechaModal1 = document.getElementById("fecha1");
var fechaModal2 = document.getElementById("fecha2");
var fechaModal3 = document.getElementById("fecha3");

var botaoEstatisticas = document.getElementById("ver-estatisticas");
var botaoJogarNovamente = document.getElementById("jogar-novamente");
var botaoAlterarJogadores = document.getElementById("alterar");
var botaoConfirmarNomes = document.getElementById("confirmar");

var informativoJogador = document.getElementById("jogador-da-vez");
var informativoCaixa = document.getElementById("informativo");

var inicio = new Date();
var tempoTotal = document.getElementById("tempo-total");

var j1Ganhado = document.getElementById("j1-ganhado");
var j2Ganhado = document.getElementById("j2-ganhado");


/**
 * Quando o site e' acessado pela primeira vez
 * aparece o modal para escolher entre "X" ou "O".
 */
function comeca() {
    $('#modal-comeco').modal('show');
    j1Ganhado.innerHTML = jogo.usuario1Ganhou;
    j2Ganhado.innerHTML = jogo.usuario2Ganhou;
}// fim comeca()


/**
 * Quando o botao estatisticas for clicado
 * aparece um modal para ver as estatisticas.
 */
botaoEstatisticas.onclick = function() {
    modalEstatisticas.style.display = "block";
}

botaoAlterarJogadores.onclick = function() {
    modalAlterarJogadores.style.display = "block";
}


/**
 * Quando clicar no botao "X" fecha o modal.
 */
fechaModal1.onclick = function() {
    modalComeco.style.display = "none";
}

fechaModal2.onclick = function() {
    modalEstatisticas.style.display = "none";
}

fechaModal3.onclick = function() {
    modalAlterarJogadores.style.display = "none";
}

/**
 * Quando a pessoa clicar no botao jogar novamente
 * aparece o modal de escolher X ou O
 */
botaoJogarNovamente.onclick = function() {
    reset();
    comeca();
}


/**
 * Quando apertar no botao confirmar, o modal desaparece.
 */
botaoConfirmarNomes.onclick = function() {
    modalAlterarJogadores.style.display = "none";
}


/**
 * Metodo icone() - adiciona icone no campo especificado.
 */
function icone(id) {
    if(jogo.jogadorDaVez == 'Jogador 1') {
        $('#' + id).html(jogo.usuario1);
        $('#' + id).removeAttr('onClick');
        
        statusJogo();

        atribuiJogadorDaVez('Jogador 2');
    } else if(jogo.jogadorDaVez == 'Jogador 2') {
        $('#' + id).html(jogo.usuario2);
        $('#' + id).removeAttr('onClick');

        statusJogo();

        atribuiJogadorDaVez('Jogador 1');
    }// fim if

    jogo.jogadas++;
}// fim icone()


/**
 * Coloca o "X" ou o "O".
 */
function colocaFigura(id) {
    if(id === 'x') {
        jogo.usuario1 = '<span id="j1" class="fa fa-times" style="color: #FF3266; font-size: 82px;"></span>';
        jogo.usuario2 = '<span id="j2" class="fa fa-circle-o" style="color: #30CB76; font-size: 82px;"></span>';
    } else if(id === 'o') {
        jogo.usuario1 = '<span id="j1" class="fa fa-circle-o" style="color: #30CB76; font-size: 82px;"></span>';
        jogo.usuario2 = '<span id="j2" class="fa fa-times" style="color: #FF3266; font-size: 82px;"></span>';
    }// fim if

    atribuiJogadorDaVez('Jogador 1');
}// fim colocaFigura()


/**
 * Atribui para o jogador da vez.
 */
function atribuiJogadorDaVez(jogador) {
    jogo.jogadorDaVez = jogador;

    if(jogador == 'Jogador 1') {
        informativoCaixa.classList.remove('jogador2');
        informativoCaixa.classList.add('jogador1');
    } else if(jogador == 'Jogador 2') {
        informativoCaixa.classList.remove('jogador1');
        informativoCaixa.classList.add('jogador2');
    }// fim if

    $(informativoJogador).html('Vez de: <b>' + jogador + '</b>');
}// fim atribuiJogadorDaVez()


function lockAll() {
    $('.tabuleiro').removeAttr('onClick');
}// fim lockAll()


function statusJogo() {
    var jogador;

    if(jogo.jogadorDaVez == 'Jogador 1') {
        jogador = jogo.usuario1;
    } else if(jogo.jogadorDaVez == 'Jogador 2') {
        jogador = jogo.usuario2;
    }// fim if

    switch(true) {
        case $('#primeiro').html() === jogador && $('#segundo').html() === jogador && $('#terceiro').html() === jogador:
            ganhou(jogador);
            mostraPerdedores('#quarto', '#quinto', '#sexto', '#setimo', '#oitavo', '#nono');
            break;

        case $('#quarto').html() === jogador && $('#quinto').html() === jogador && $('#sexto').html() === jogador:
            ganhou(jogador);
            mostraPerdedores('#primeiro', '#segundo', '#terceiro', '#setimo', '#oitavo', '#nono');
            break;

        case $('#setimo').html() === jogador && $('#oitavo').html() === jogador && $('#nono').html() === jogador:
            ganhou(jogador);
            mostraPerdedores('#primeiro', '#segundo', '#terceiro', '#quarto', '#quinto', '#sexto');
            break;

        case $('#primeiro').html() === jogador && $('#quarto').html() === jogador && $('#setimo').html() === jogador:
            ganhou(jogador);
            mostraPerdedores('#segundo', '#terceiro', '#quinto', '#sexto', '#oitavo', '#nono');
            break;
        
        case $('#segundo').html() === jogador && $('#quinto').html() === jogador && $('#oitavo').html() === jogador:
            ganhou(jogador);
            mostraPerdedores('#primeiro', '#terceiro', '#quarto', '#sexto', '#setimo', '#nono');
            break;
        
        case $('#terceiro').html() === jogador && $('#sexto').html() === jogador && $('#nono').html() === jogador:
            ganhou(jogador);
            mostraPerdedores('#primeiro', '#segundo', '#quarto', '#quinto', '#setimo', '#oitavo');
            break;//

        case $('#primeiro').html() === jogador && $('#quinto').html() === jogador && $('#nono').html() === jogador:
            ganhou(jogador);
            mostraPerdedores('#segundo', '#terceiro', '#quarto', '#sexto', '#setimo', '#oitavo');
            break;
                
        case $('#terceiro').html() === jogador && $('#quinto').html() === jogador && $('#setimo').html() === jogador:
            ganhou(jogador);
            mostraPerdedores('#primeiro', '#segundo', '#quarto', '#sexto', '#oitavo', '#nono');
            break;

        default:
            empate();
    }// fim switch
}// fim statusJogo()


function mostraPerdedores(p1, p2, p3, p4, p5, p6) {
    var p1 = $(p1);
    var p2 = $(p2);
    var p3 = $(p3);
    var p4 = $(p4);
    var p5 = $(p5);
    var p6 = $(p6);
    
    p1.addClass('perdeu');
    p2.addClass('perdeu');
    p3.addClass('perdeu');
    p4.addClass('perdeu');
    p5.addClass('perdeu');
    p6.addClass('perdeu');

    lockAll();
}// fim mostraPerdedores()


function empate() {
    if(jogo.jogadas === 9) {
        informativoJogador.innerHTML = 'Empate';
        // $(informativoJogador).html('Empate');
    }// fim if
}// fim empate()


function ganhou(jogador) {
    informativoJogador.innerHTML = jogador + ' venceu!';

    if(jogador == 'Jogador 1') {
        jogo.usuario1Ganhou++;
    } else {
        jogo.usuario2Ganhou++;    
    }// fim if

    j1Ganhado.innerHTML = jogo.usuario1Ganhou;
    j2Ganhado.innerHTML = jogo.usuario2Ganhou;

    var final = new Date(new Date() - inicio);

    tempoTotal.innerHTML = "<b>" + final.getMinutes() + "m" + final.getSeconds() + "s</b>";
}// fim ganhou()


function nomeJogadores(j1, j2) {
    jogo.usuario1 = j1;
    jogo.usuario2 = j2;
}


function reset() {
    $('.tabuleiro').html('');

    jogo.jogadas = 1;

    $('.tabuleiro').attr('onClick', 'icone(this.id)');
    
    setTimeout(primeiroMovimento, 200);
}// fim reset()

setTimeout(comeca, 600);