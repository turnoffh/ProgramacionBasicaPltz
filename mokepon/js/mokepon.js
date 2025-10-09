function iniciarJuego() {
    let botonMascotaJugador = document.getElementById('boton-mascota');
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    let botonFuego = document.getElementById('boton-fuego');
    let botonAgua = document.getElementById('boton-agua');
    let botonTierra = document.getElementById('boton-tierra');
    let botonReiniciar = document.getElementById('boton-reiniciar');

}

function seleccionarMascotaJugador() {
    let hipodoge = document.getElementById('hipodoge');
    let capipepo = document.getElementById('capipepo');
    let ratigueya = document.getElementById('ratigueya');
    let langostelvis = document.getElementById('langostelvis');
    let tucapalma = document.getElementById('tucapalma');
    let pydos = document.getElementById('pydos');
    if (hipodoge.checked) {
        alert('Seleccionaste a Hipodoge');
    } else if (capipepo.checked) {
        alert('Seleccionaste a Capipepo');
    } else if (ratigueya.checked) {
        alert('Seleccionaste a Ratigueya');
    } else if (langostelvis.checked) {
        alert('Seleccionaste a Langostelvis');
    } else if (tucapalma.checked) {
        alert('Seleccionaste a Tucapalma');
    } else if (pydos.checked) {
        alert('Seleccionaste a Pydos');
    }
}

window.addEventListener('load', iniciarJuego); //Cuando el navegador cargue, se ejecuta la función iniciarJuego