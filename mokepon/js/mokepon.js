let ataqueJugador;
let ataqueEnemigo;
let vidasJugador;
let vidasEnemigo;

function iniciarJuego() {
    vidasJugador = 3;
    vidasEnemigo = 3;
    let selAtaque = document.getElementById('seleccionar-ataque');
    selAtaque.style.display = 'none';
    let secMensajes = document.getElementById('resultado');
    secMensajes.style.display = 'none';
    let botonMascotaJugador = document.getElementById('boton-mascota');
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    let botonFuego = document.getElementById('boton-fuego');
    botonFuego.addEventListener('click', ataqueFuego);
    let botonAgua = document.getElementById('boton-agua');
    botonAgua.addEventListener('click', ataqueAgua);
    let botonTierra = document.getElementById('boton-tierra');
    botonTierra.addEventListener('click', ataqueTierra);
    let vidasJugadorHtml = document.getElementById('vidas-jugador');
    vidasJugadorHtml.innerHTML = vidasJugador;
    let vidasEnemigoHtml = document.getElementById('vidas-enemigo');
    vidasEnemigoHtml.innerHTML = vidasEnemigo;
    let botonReiniciar = document.getElementById('boton-reiniciar');
    botonReiniciar.addEventListener('click', reiniciarJuego);
    botonReiniciar.style.display = 'none';
}

function seleccionarMascotaJugador() {
    let mascotaJugador = document.getElementById('mascota-jugador');
    let hipodoge = document.getElementById('hipodoge');
    let capipepo = document.getElementById('capipepo');
    let ratigueya = document.getElementById('ratigueya');
    let langostelvis = document.getElementById('langostelvis');
    let tucapalma = document.getElementById('tucapalma');
    let pydos = document.getElementById('pydos');
    if (hipodoge.checked) {
        mascotaJugador.innerHTML = 'SAMUEL';
    } else if (capipepo.checked) {
        mascotaJugador.innerHTML = 'CAPIPEPO';
    } else if (ratigueya.checked) {
        mascotaJugador.innerHTML = 'RATIGUEYA';
    } else if (langostelvis.checked) {
        mascotaJugador.innerHTML = 'LANGOSTELVIS';
    } else if (tucapalma.checked) {
        mascotaJugador.innerHTML = 'TUCAPALMA';
    } else if (pydos.checked) {
        mascotaJugador.innerHTML = 'PYDOS';
    } else {
        alert('Selecciona una mascota');
        return;
    }
    seleccionarMascotaEnemigo();
    let botonMascotaJugador = document.getElementById('boton-mascota');
    botonMascotaJugador.disabled = true;
    let selAtaque = document.getElementById('seleccionar-ataque');
    selAtaque.style.display = 'flex';
    let secMensajes = document.getElementById('resultado');
    secMensajes.style.display = 'block';
    let secSeleccionarMascota = document.getElementById('seleccionar-mascota');
    secSeleccionarMascota.style.display = 'none';
}

function seleccionarMascotaEnemigo() {
    let numeroAleatorio = aleatorio(1, 6);
    let mascotaEnemigo = document.getElementById('mascota-enemigo');
    if (numeroAleatorio == 1) {
        mascotaEnemigo.innerHTML = 'HIPODOGE';
    } else if (numeroAleatorio == 2) {
        mascotaEnemigo.innerHTML = 'CAPIPEPO';
    } else if (numeroAleatorio == 3) {
        mascotaEnemigo.innerHTML = 'RATIGUEYA';
    } else if (numeroAleatorio == 4) {
        mascotaEnemigo.innerHTML = 'LANGOSTELVIS';
    } else if (numeroAleatorio == 5) {
        mascotaEnemigo.innerHTML = 'TUCAPALMA';
    } else {
        mascotaEnemigo.innerHTML = 'PYDOS';
    }
}

function ataqueFuego() {
    ataqueJugador = 'FUEGO';
    ataqueAleatorioEnemigo();
}

function ataqueAgua() {
    ataqueJugador = 'AGUA';
    ataqueAleatorioEnemigo();
}

function ataqueTierra() {
    ataqueJugador = 'TIERRA';
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3);
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO';
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'AGUA';
    } else {
        ataqueEnemigo = 'TIERRA';
    }
    combate();
}

function combate() {
    if (ataqueJugador == ataqueEnemigo) {
        crearMensaje('EMPATE');
    } else if ((ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') || (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') || (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA')) {
        crearMensaje('GANASTE');
        vidasEnemigo--;
        revisarVidas();
    } else {
        crearMensaje('PERDISTE');
        vidasJugador--;
        revisarVidas();
    }
}

function revisarVidas() {
    let vidasJugadorHtml = document.getElementById('vidas-jugador');
    vidasJugadorHtml.innerHTML = vidasJugador;
    let vidasEnemigoHtml = document.getElementById('vidas-enemigo');
    vidasEnemigoHtml.innerHTML = vidasEnemigo;
    if (vidasEnemigo == 0) {
        crearMensaje('FELICIDADES, GANASTE EL COMBATE');
        bloquearBotones();
    } else if (vidasJugador == 0) {
        crearMensaje('LO SIENTO, PERDISTE EL COMBATE');
        bloquearBotones();
    }

}

function bloquearBotones() {
    let botonFuego = document.getElementById('boton-fuego');
    botonFuego.disabled = true;
    let botonAgua = document.getElementById('boton-agua');
    botonAgua.disabled = true;
    let botonTierra = document.getElementById('boton-tierra');
    botonTierra.disabled = true;
    let botonReiniciar = document.getElementById('boton-reiniciar');
    botonReiniciar.style.display = 'block';
}

function reiniciarJuego() {
    location.reload();
}

function crearMensaje(resultado) {
    let sectionMensajes = document.getElementById('resultado');
    let ataquesDelJugador = document.getElementById('ataques-del-jugador');
    let ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');

    let nuevoAtaqueJugador = document.createElement('p');
    let nuevoAtaqueEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueJugador.innerHTML = ataqueJugador;
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo;

    ataquesDelJugador.appendChild(nuevoAtaqueJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueEnemigo);
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', iniciarJuego); //Cuando el navegador cargue, se ejecuta la función iniciarJuego