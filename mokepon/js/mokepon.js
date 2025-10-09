let ataqueJugador;

function iniciarJuego() {
    let botonMascotaJugador = document.getElementById('boton-mascota');
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    let botonFuego = document.getElementById('boton-fuego');
    botonFuego.addEventListener('click', ataqueFuego);
    let botonAgua = document.getElementById('boton-agua');
    botonAgua.addEventListener('click', ataqueAgua);
    let botonTierra = document.getElementById('boton-tierra');
    botonTierra.addEventListener('click', ataqueTierra);
    let botonReiniciar = document.getElementById('boton-reiniciar');
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
        mascotaJugador.innerHTML = 'HIPODOGE';
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
    }
    seleccionarMascotaEnemigo();
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
}

function ataqueAgua() {
    ataqueJugador = 'AGUA';
}

function ataqueTierra() {
    ataqueJugador = 'TIERRA';
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', iniciarJuego); //Cuando el navegador cargue, se ejecuta la función iniciarJuego