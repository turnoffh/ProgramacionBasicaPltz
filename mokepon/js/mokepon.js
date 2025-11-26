//#region Clases
class Mokepon { //Clases inician con mayuscula
    constructor(nombre, foto, vida, fotoMapa, x=10, y=10) {
        this.nombre = nombre; //this hace referencia a la misma clase Mokepon
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
        this.x = x;
        this.y = y;
        this.ancho = 40;
        this.alto = 40;
        this.mapaFoto = new Image();
        this.mapaFoto.src = fotoMapa;
        this.velocidadX = 0;
        this.velocidadY = 0;
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
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
const secVerMapa = document.getElementById('ver-mapa');
const canvas = document.getElementById('mapa');
const lienzo = canvas.getContext('2d');

let mokepones = []; //arreglo vacio
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let opcionDeMokepones;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let hipodoge;
let capipepo;
let ratigueya;
let botonFuego;
let botonAgua;
let botonTierra;
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let mascotaSeleccionadaJug;
let mascJugadorObjeto;
let arrAtaqueJugador = [];
let arrAtaqueEnemigo = [];
let mokHipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png');
let mokCapipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png');
let mokRatigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png');
let mokHipodogeEnem = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png',80, 120);
let mokCapipepoEnem = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png', 150, 95);
let mokRatigueyaEnem = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png', 200, 190);
let intervalo;
let mapBackground = new Image();
mapBackground.src = './assets/mokemap.png';
//#endregion

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
    secVerMapa.style.display = 'none';

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

    vidasJugadorHtml.innerHTML = victoriasJugador;
    vidasEnemigoHtml.innerHTML = victoriasEnemigo;
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
    
    secVerMapa.style.display = 'flex';
    iniciarMapa();
    
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
                boton.disabled = true;
            } else if (e.target.textContent === '💧') {
                arrAtaqueJugador.push('AGUA');
                boton.style.background = '#112f58';
                boton.disabled = true;
            } else {
                arrAtaqueJugador.push('TIERRA');
                boton.style.background = '#112f58';
                boton.disabled = true;
            }
            ataqueAleatorioEnemigo();
        });
    });
    
}

function seleccionarMascotaEnemigo() {
    let numeroAleatorio = aleatorio(0, mokepones.length -1);
    ataquesMokeponEnemigo = mokepones[numeroAleatorio].ataques;
    mascotaEnemigo.innerHTML = mokepones[numeroAleatorio].nombre;
    secuenciaAtaque();
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length -1);
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        arrAtaqueEnemigo.push('FUEGO');
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        arrAtaqueEnemigo.push('AGUA');
    } else {
        arrAtaqueEnemigo.push('TIERRA');
    }
    iniciarPelea();
}

function iniciarPelea() {
    if(arrAtaqueJugador.length === 5) {
        combate();
    }
}

function indexAmbosOponentes(jugador, enemigo) { 
    indexAtaqueJugador = arrAtaqueJugador[jugador];
    indexAtaqueEnemigo = arrAtaqueEnemigo[enemigo];
}

function combate() {
    for (let index = 0; index < arrAtaqueJugador.length; index++) {
        if (arrAtaqueJugador[index] === arrAtaqueEnemigo[index]) {
            indexAmbosOponentes(index, index);
            crearMensaje();
        } else if ((arrAtaqueJugador[index] == 'FUEGO' && arrAtaqueEnemigo[index] == 'TIERRA') || 
                (arrAtaqueJugador[index] == 'AGUA' && arrAtaqueEnemigo[index] == 'FUEGO') || 
                (arrAtaqueJugador[index] == 'TIERRA' && arrAtaqueEnemigo[index] == 'AGUA')) 
        {
            indexAmbosOponentes(index, index);
            crearMensaje();
            victoriasJugador++;
            vidasJugadorHtml.innerHTML = victoriasJugador;
        } else {
            indexAmbosOponentes(index, index);
            crearMensaje();
            victoriasEnemigo++;
            vidasEnemigoHtml.innerHTML = victoriasEnemigo;
        }
    }
    revisarGanador();
    
}

function revisarGanador() {
    if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal('¡FELICIDADES! ¡GANASTE EL JUEGO!');
    } else if (victoriasEnemigo > victoriasJugador) {
        crearMensajeFinal('LO SIENTO, PERDISTE EL JUEGO');
    } else {
        crearMensajeFinal('EL JUEGO TERMINÓ EN EMPATE');
    }
    botonReiniciar.style.display = 'block';
}

function reiniciarJuego() {
    location.reload();
}

function crearMensaje() {
    let nuevoAtaqueJugador = document.createElement('p');
    let nuevoAtaqueEnemigo = document.createElement('p');

    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo;

    ataquesDelJugador.appendChild(nuevoAtaqueJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueEnemigo);
}

function crearMensajeFinal(resultado) {
    secMensajes.innerHTML = resultado;
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function pintarCanvas() {
    mascJugadorObjeto.x = mascJugadorObjeto.x + mascJugadorObjeto.velocidadX;
    mascJugadorObjeto.y = mascJugadorObjeto.y + mascJugadorObjeto.velocidadY;
    lienzo.clearRect(0, 0, canvas.width, canvas.height); //limpia el canvas
    lienzo.drawImage(
        mapBackground,
        0,
        0,
        canvas.width,
        canvas.height
    );
    mascJugadorObjeto.pintarMokepon();
    mokHipodogeEnem.pintarMokepon();
    mokCapipepoEnem.pintarMokepon();
    mokRatigueyaEnem.pintarMokepon();
}

function moverDerecha() {
    mascJugadorObjeto.velocidadX = 5;
}
function moverIzquierda() {
    mascJugadorObjeto.velocidadX = -5;
}
function moverAbajo() {
    mascJugadorObjeto.velocidadY = 5;
}
function moverArriba() {
    mascJugadorObjeto.velocidadY = -5;
}
function detenerMovimiento() {
    mascJugadorObjeto.velocidadX = 0;
    mascJugadorObjeto.velocidadY = 0;
}

function sePresionoTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba();
            break;
        case 'ArrowDown':
            moverAbajo();
            break;
        case 'ArrowLeft':
            moverIzquierda();
            break;
        case 'ArrowRight':
            moverDerecha();
            break;
        default:
            break;
    }
}

function iniciarMapa() {
    mascJugadorObjeto = obtenerObjetoMascota();
    mapa.width = 320;
    mapa.height = 240;
    intervalo = setInterval(pintarCanvas, 50);
    window.addEventListener('keydown', sePresionoTecla);
    window.addEventListener('keyup', detenerMovimiento);    
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaSeleccionadaJug === mokepones[i].nombre) {
            return mokepones[i];
        }
    }
}
//#endregion
window.addEventListener('load', iniciarJuego); //Cuando el navegador cargue, se ejecuta la función iniciarJuego