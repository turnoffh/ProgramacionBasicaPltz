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
let mokeponesEnemigos = [];
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
//#region Clases
class Mokepon { //Clases inician con mayuscula
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id;
        this.nombre = nombre; //this hace referencia a la misma clase Mokepon
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
        this.ancho = 40;
        this.alto = 40;
        this.x = aleatorio(0, canvas.width - this.ancho);
        this.y = aleatorio(0, canvas.height - this.alto);
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
let mokHipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png');
let mokCapipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png');
let mokRatigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png');
let intervalo;
let mapBackground = new Image();
mapBackground.src = './assets/mokemap.png';
let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20; // -20 parta que tenga un espacio a los lados
let jugadorId = null;
let enemigoId = null;
const anchoMaximoDelMapa = 350;

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20;
}

alturaQueBuscamos = anchoDelMapa * 600 / 800;
canvas.width = anchoDelMapa;
canvas.height = alturaQueBuscamos;
//#endregion

const HIPODOGE_ATAQUES = [
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' }
]
const CAPIPEPO_ATAQUES = [
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' }
]
const RATIGUEYA_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' }    
]

mokHipodoge.ataques.push(...HIPODOGE_ATAQUES);
mokCapipepo.ataques.push(...CAPIPEPO_ATAQUES);
mokRatigueya.ataques.push(...RATIGUEYA_ATAQUES);

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

    unirseAlJuego();
}
function unirseAlJuego() {
    fetch("http://localhost:8080/unirse") //hace una peticion get por defecto
        .then(function (res) {
            if (res.ok) {
                res.text()
                .then(function (respuesta) {
                    jugadorId = respuesta;
                })
            }
        })
        .catch(function (err) {
            console.log(err);
        });
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
    extraerAtaques(mascotaSeleccionadaJug);
    
    botonMascotaJugador.disabled = true;
    
    secVerMapa.style.display = 'flex';
    iniciarMapa();
    
    secMensajes.style.display = 'block';
    secSeleccionarMascota.style.display = 'none';

    seleccionarMokepon(mascotaSeleccionadaJug);
}
function seleccionarMokepon(mascotaSeleccionadaJug) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaSeleccionadaJug
        })
    })
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
            if(arrAtaqueJugador.length === 5) { //Si se seleccionaron los 5 ataques, se inicia la pelea
                enviarAtaques();
            }
        });
    });
}
function enviarAtaques() {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: arrAtaqueJugador
        })
    })
    
    intervalo = setInterval(obtenerAtaques, 50);
}
function obtenerAtaques() {
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`) //hace una peticion get por defecto
        .then(function (res) {
            if (res.ok) {
                res.json()
                .then(function ({ ataques }) {
                    if(ataques.length === 5) {
                        ataquesMokeponEnemigo = ataques;
                        arrAtaqueEnemigo = ataques;
                        combate();
                    }   
                })
            }
        })
        .catch(function (err) {
            console.log(err);   
        });
}
function seleccionarMascotaEnemigo(enemigo) {
    ataquesMokeponEnemigo = enemigo.ataques;
    mascotaEnemigo.innerHTML = enemigo.nombre;
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
    clearInterval(intervalo);
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

    enviarPosicion(mascJugadorObjeto.x, mascJugadorObjeto.y);
    mokeponesEnemigos.forEach(function (mokepon) {
        if(mokepon !== undefined) {
            mokepon.pintarMokepon();
            revisarColision(mokepon);
        }
    });
}
function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                x,
                y
            })
        })
        .then(function (res) {
            if (res.ok) {
                res.json()
                .then(function ({ enemigos }) {

                    mokeponesEnemigos = enemigos.map(function (enemigo) {
                        let mokeponEnemigo = null;
                        if(enemigo.mokepon === undefined) {
                            return;
                        }
                        const mokeponNombre = enemigo.mokepon.nombre || "";
                        if (mokeponNombre === "Hipodoge") {
                            mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png',enemigo.id);
                        } else if (mokeponNombre === "Capipepo") {
                            mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png',enemigo.id);
                        } else if (mokeponNombre === "Ratigueya") {
                            mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png',enemigo.id);
                        }
                        
                        mokeponEnemigo.x = enemigo.x;
                        mokeponEnemigo.y = enemigo.y;

                        return mokeponEnemigo;
                    })
                })  
            }
        })
        .catch(function (err) {
            console.log(err);
        });
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
function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + enemigo.alto;
    const izquierdaEnemigo = enemigo.x;
    const derechaEnemigo = enemigo.x + enemigo.ancho;
    const arribaMascota = mascJugadorObjeto.y;
    const abajoMascota = mascJugadorObjeto.y + mascJugadorObjeto.alto;
    const izquierdaMascota = mascJugadorObjeto.x;
    const derechaMascota = mascJugadorObjeto.x + mascJugadorObjeto.ancho;

    if( abajoMascota < arribaEnemigo || 
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo ) {
            return;
    }
    detenerMovimiento();
    clearInterval(intervalo);
    enemigoId = enemigo.id;
    selAtaque.style.display = 'flex';
    secVerMapa.style.display = 'none';
    seleccionarMascotaEnemigo(enemigo)
    
}
//#endregion
window.addEventListener('load', iniciarJuego); //Cuando el navegador cargue, se ejecuta la función iniciarJuego