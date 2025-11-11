//#region Clases
class Mokepon { //Clases inician con mayuscula
    constructor(nombre, foto, vida) {
        this.nombre = nombre; //this hace referencia a la misma clase Mokepon
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
    }
}
//#endregion

//let permite cambiar, const no
//#region Variables y constantes
const selAtaque = document.getElementById('seleccionar-ataque');
const secMensajes = document.getElementById('resultado');
const botonMascotaJugador = document.getElementById('boton-mascota');
const botonFuego = document.getElementById('boton-fuego');
const botonAgua = document.getElementById('boton-agua');
const botonTierra = document.getElementById('boton-tierra');
const vidasJugadorHtml = document.getElementById('vidas-jugador');
const vidasEnemigoHtml = document.getElementById('vidas-enemigo');
const botonReiniciar = document.getElementById('boton-reiniciar');
const mascotaJugador = document.getElementById('mascota-jugador');
const hipodoge = document.getElementById('hipodoge');
const capipepo = document.getElementById('capipepo');
const ratigueya = document.getElementById('ratigueya');
const secSeleccionarMascota = document.getElementById('seleccionar-mascota');
const mascotaEnemigo = document.getElementById('mascota-enemigo');
const ataquesDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');

let mokepones = []; //arreglo vacio
let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;
let mokHipodoge = new Mokepon('Hipodoge', '.assets/mokepons_mokepon_hipodoge_attack.png', 5);
let mokCapipepo = new Mokepon('Capipepo', '.assets/mokepons_mokepon_capipepo_attack.png', 5);
let mokRatigueya = new Mokepon('Ratigueya', '.assets/mokepons_mokepon_ratigueya_attack.png', 5);

mokHipodoge.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-tierra' },
    { nombre: '🔥', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' }
)
mokCapipepo.ataques.push(
    { nombre: '🌱', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-tierra' }
)
mokRatigueya.ataques.push(
    { nombre: '🔥', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' }
)
//#endregion

//#region funciones
function iniciarJuego() {
    selAtaque.style.display = 'none';
    secMensajes.style.display = 'none';
    botonReiniciar.style.display = 'none';

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    botonFuego.addEventListener('click', ataqueFuego);
    botonAgua.addEventListener('click', ataqueAgua);
    botonTierra.addEventListener('click', ataqueTierra);
    botonReiniciar.addEventListener('click', reiniciarJuego);

    vidasJugadorHtml.innerHTML = vidasJugador;
    vidasEnemigoHtml.innerHTML = vidasEnemigo;
}

function seleccionarMascotaJugador() {
    if (hipodoge.checked) {
        mascotaJugador.innerHTML = 'HIPODOGE';
    } else if (capipepo.checked) {
        mascotaJugador.innerHTML = 'CAPIPEPO';
    } else if (ratigueya.checked) {
        mascotaJugador.innerHTML = 'RATIGUEYA';
    } else {
        alert('Selecciona una mascota');
        return;
    }
    seleccionarMascotaEnemigo();
    
    botonMascotaJugador.disabled = true;
    
    selAtaque.style.display = 'flex';
    secMensajes.style.display = 'block';
    secSeleccionarMascota.style.display = 'none';
}

function seleccionarMascotaEnemigo() {
    let numeroAleatorio = aleatorio(1, 3);
    
    if (numeroAleatorio == 1) {
        mascotaEnemigo.innerHTML = 'HIPODOGE';
    } else if (numeroAleatorio == 2) {
        mascotaEnemigo.innerHTML = 'CAPIPEPO';
    } else if (numeroAleatorio == 3) {
        mascotaEnemigo.innerHTML = 'RATIGUEYA';
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
    } else if ((ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') || 
                (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') || 
                (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA')) 
    {
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
    vidasJugadorHtml.innerHTML = vidasJugador;
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
    botonFuego.disabled = true;
    botonAgua.disabled = true;
    botonTierra.disabled = true;
    botonReiniciar.style.display = 'block';
}

function reiniciarJuego() {
    location.reload();
}

function crearMensaje(resultado) {
    let nuevoAtaqueJugador = document.createElement('p');
    let nuevoAtaqueEnemigo = document.createElement('p');

    secMensajes.innerHTML = resultado;
    nuevoAtaqueJugador.innerHTML = ataqueJugador;
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo;

    ataquesDelJugador.appendChild(nuevoAtaqueJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueEnemigo);
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//#endregion
window.addEventListener('load', iniciarJuego); //Cuando el navegador cargue, se ejecuta la función iniciarJuego