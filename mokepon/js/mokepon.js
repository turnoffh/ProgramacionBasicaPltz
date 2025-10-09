function seleccionarMascotaJugador() 
{
    alert('Seleccionaste a tu mascota');
}

let botonMascotaJugador = document.getElementById('boton-mascota');
let botonFuego = document.getElementById('boton-fuego');
let botonAgua = document.getElementById('boton-agua');
let botonTierra = document.getElementById('boton-tierra');
let botonReiniciar = document.getElementById('boton-reiniciar');

botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);

