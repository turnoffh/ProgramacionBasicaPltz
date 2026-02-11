const cors = require('cors');//Importar cors para permitir el acceso desde cualquier origen
const express = require('express');//Funcion especial de node para crear servidores

const app = express();//Crear el servidor

app.use(cors());//Usar cors en el servidor
app.use(express.json());//Configurar el servidor para que entienda JSON

const jugadores = [];//Array para guardar los jugadores
class Jugador {
    constructor(id) {
        this.id = id;//Id del jugador
    }

    asignarMokepon(mokepon) {
        this.mokepon = mokepon;//Asignar el mokepon al jugador
    }

    actualizarPosicion(x, y) {
        this.x = x;//Asignar la posicion x al jugador
        this.y = y;//Asignar la posicion y al jugador
    }

    asignarAtaques(ataques) {
        this.ataques = ataques;//Asignar los ataques al jugador
    }
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre;//Nombre del mokepon
    }
}

app.get("/unirse", (req, res) => { //Arrow function que recibe una peticion y una respuesta
    const id = `${Math.random()}`;//Generar un id aleatorio para el jugador, como cadena de texto
    const nuevoJugador = new Jugador(id);//Crear un nuevo jugador con el id generado
    jugadores.push(nuevoJugador);//Agregar el nuevo jugador al array de jugadores
    res.send(id);//Enviar el id del jugador como respuesta
})

app.post("/mokepon/:jugadorId", (req, res) => { //Ruta para recibir el mokepon del jugador
    const jugadorId = req.params.jugadorId || "";//Obtener el id del jugador de los parametros de la ruta
    const nombre = req.body.mokepon || "";//Obtener el mokepon del cuerpo de la peticion   
    const mok = new Mokepon(nombre);//Crear un nuevo mokepon con el nombre recibido

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);//Buscar el indice del jugador en el array de jugadores
    if (jugadorIndex >= 0) {//Si el jugador existe
        jugadores[jugadorIndex].asignarMokepon(mok);//Asignar el mokepon al jugador
    }   
    res.end();//Terminar la respuesta
});

app.post("/mokepon/:jugadorId/posicion", (req, res) => { //Ruta para recibir la posicion del mokepon del jugador
    const jugadorId = req.params.jugadorId || "";//Obtener el id del jugador de los parametros de la ruta
    const x = req.body.x || 0;//Obtener la posicion x del cuerpo de la peticion
    const y = req.body.y || 0;//Obtener la posicion y del cuerpo de la peticion
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);//Buscar el indice del jugador en el array de jugadores
    if (jugadorIndex >= 0) {//Si el jugador existe
        jugadores[jugadorIndex].actualizarPosicion(x, y);//Actualizar la posicion del jugador
    }
    
    const enemigos = jugadores.filter((jugador) => jugador.id !== jugadorId);//Filtrar los jugadores que no son el jugador actual
    
    res.send({enemigos});//Enviar los enemigos como respuesta
});

app.post("/mokepon/:jugadorId/ataques", (req, res) => { //Ruta para recibir el mokepon del jugador
    const jugadorId = req.params.jugadorId || "";//Obtener el id del jugador de los parametros de la ruta
    const ataques = req.body.ataques || [];//Obtener el mokepon del cuerpo de la peticion   

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);//Buscar el indice del jugador en el array de jugadores
    if (jugadorIndex >= 0) {//Si el jugador existe
        jugadores[jugadorIndex].asignarAtaques(ataques);//Asignar los ataques al jugador
    }   
    res.end();//Terminar la respuesta
});

app.listen(8080, () => console.log("Servidor corriendo en puerto 8080"));//Puerto donde se va a ejecutar el servidor
