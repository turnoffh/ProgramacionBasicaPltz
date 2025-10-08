//Primero se escriben las funciones y despues se llaman, se inicia con minuscula
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function eleccion(jugada) {
    let resultado = "";
    if (jugada == 1) {
        resultado = "Piedra";
    } else if (jugada == 2) {
        resultado = "Papel";
    } else if (jugada == 3) {
        resultado = "Tijera";
    } else {
        resultado = "MAL ELEGIDO";
    }
    return resultado;
}
function combate(jugador, pc) {
    let resultado = "";
    if (jugador == pc) {
        resultado = "EMPATE";
    } else if ((jugador == 1 && pc == 3) || (jugador == 2 && pc == 1) || (jugador == 3 && pc == 2)) {
        resultado = "GANASTE";
    } else {
        resultado = "PERDISTE";
    }
    return resultado;
}
//1 Piedra, 2 Papel, 3 Tijera
let jugador = 0;
let computadora = 0;
let triunfos = 0;
let derrotas = 0;
while (triunfos < 3 && derrotas < 3) {
    pc = aleatorio(1, 3);
    jugador = prompt("Elige: 1 Piedra, 2 Papel, 3 Tijera");
    alert("PC elige: " + eleccion(pc));
    alert("Jugador elige: " + eleccion(jugador));
    if (combate(jugador, pc) == "GANASTE") {
        triunfos++;
    } else {
        derrotas++;
    }
}
alert("Partida terminada. Ganaste: " + triunfos + " veces. Perdiste: " + derrotas + " veces.");
if (triunfos == 3) {
    alert("Felicidades, ganaste la partida.");
} else {
    alert("Lo siento, perdiste la partida.");
}