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
const vidasJugadorHtml = document.getElementById('vidas-jugador');
const vidasEnemigoHtml = document.getElementById('vidas-enemigo');
const botonReiniciar = document.getElementById('boton-reiniciar');
const mascotaJugador = document.getElementById('mascota-jugador');

const secSeleccionarMascota = document.getElementById('seleccionar-mascota');
const mascotaEnemigo = document.getElementById('mascota-enemigo');
const ataquesDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');
const contenedorTarjetas = document.getElementById('contenedor-tarjetas');
const contenedorAtaques = document.getElementById('contenedor-ataques');

let mokepones = []; //arreglo vacio
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;
let opcionDeMokepones;
let ataquesMokepon;
let hipodoge;
let capipepo;
let ratigueya;
let botonFuego;
let botonAgua;
let botonTierra;
let botones = [];
let mascotaSeleccionadaJug;
let arrAtaqueJugador = [];
let mokHipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5);
let mokCapipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5);
let mokRatigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5);

mokHipodoge.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' }
)

mokCapipepo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' }
)

mokRatigueya.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' }
)

mokepones.push(mokHipodoge, mokCapipepo, mokRatigueya);
//#endregion

//#region funciones
function iniciarJuego() {
    selAtaque.style.display = 'none';
    secMensajes.style.display = 'none';
    botonReiniciar.style.display = 'none';

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `<input type="radio" name="mascota" id=${mokepon.nombre} />
                <label class="tarjeta-mokepon" for=${mokepon.nombre} >
                    <p>${mokepon.nombre}</p>
                    <img src=${mokepon.foto} alt=${mokepon.nombre} />
                </label> `
        contenedorTarjetas.innerHTML += opcionDeMokepones;

        hipodoge = document.getElementById('Hipodoge');
        capipepo = document.getElementById('Capipepo');
        ratigueya = document.getElementById('Ratigueya');
    })
    

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    
    botonReiniciar.addEventListener('click', reiniciarJuego);

    vidasJugadorHtml.innerHTML = vidasJugador;
    vidasEnemigoHtml.innerHTML = vidasEnemigo;
}

function seleccionarMascotaJugador() {
    if (hipodoge.checked) {
        mascotaJugador.innerHTML = hipodoge.id;
        mascotaSeleccionadaJug = hipodoge.id;
    } else if (capipepo.checked) {
        mascotaJugador.innerHTML = capipepo.id;
        mascotaSeleccionadaJug = capipepo.id;
    } else if (ratigueya.checked) {
        mascotaJugador.innerHTML = ratigueya.id;
        mascotaSeleccionadaJug = ratigueya.id;
    } else {
        alert('Selecciona una mascota');
        return;
    }
    seleccionarMascotaEnemigo();
    extraerAtaques(mascotaSeleccionadaJug);
    
    botonMascotaJugador.disabled = true;
    
    selAtaque.style.display = 'flex';
    secMensajes.style.display = 'block';
    secSeleccionarMascota.style.display = 'none';
}

function extraerAtaques(mascotaSeleccionadaJug) {
    let ataques;
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaSeleccionadaJug === mokepones[i].nombre) {
            ataques = mokepones[i].ataques;
        }
    }
    mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `<button id=${ataque.id} class="ataque BA">${ataque.nombre}</button>`;
        contenedorAtaques.innerHTML += ataquesMokepon;
        
    });

    botonFuego = document.getElementById('boton-fuego');
    botonAgua = document.getElementById('boton-agua');
    botonTierra = document.getElementById('boton-tierra');
    botones = document.querySelectorAll('.BA');
        
    secuenciaAtaque();
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if(e.target.textContent === '🔥') {
                arrAtaqueJugador.push('FUEGO');
                boton.style.background = '#112f58';
            } else if (e.target.textContent === '💧') {
                arrAtaqueJugador.push('AGUA');
                boton.style.background = '#112f58';
            } else {
                arrAtaqueJugador.push('TIERRA');
                boton.style.background = '#112f58';
            }
        });
    });
}

function seleccionarMascotaEnemigo() {
    let numeroAleatorio = aleatorio(0, mokepones.length -1);
    mascotaEnemigo.innerHTML = mokepones[numeroAleatorio].nombre;
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