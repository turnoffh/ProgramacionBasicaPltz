function iniciarJuego() {
    let botonMascotaJugador = document.getElementById('boton-mascota');
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    let botonFuego = document.getElementById('boton-fuego');
    let botonAgua = document.getElementById('boton-agua');
    let botonTierra = document.getElementById('boton-tierra');
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
        mascotaJugador.innerHTML = 'Hipodoge';
    } else if (capipepo.checked) {
        mascotaJugador.innerHTML = 'Capipepo';
    } else if (ratigueya.checked) {
        mascotaJugador.innerHTML = 'Ratigueya';
    } else if (langostelvis.checked) {
        mascotaJugador.innerHTML = 'Langostelvis';
    } else if (tucapalma.checked) {
        mascotaJugador.innerHTML = 'Tucapalma';
    } else if (pydos.checked) {
        mascotaJugador.innerHTML = 'Pydos';
    } else {
        alert('Selecciona una mascota');
    }
}

window.addEventListener('load', iniciarJuego); //Cuando el navegador cargue, se ejecuta la función iniciarJuego