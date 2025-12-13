const express = require('express');//Funcion especial de node para crear servidores

const app = express();//Crear el servidor

app.get("/", (req, res) => { //Arrow function que recibe una peticion y una respuesta
    res.send("Hola mundo desde el servidor");//Respuesta que va a dar el servidor
})

app.listen(8080, () => console.log("Servidor corriendo en puerto 8080"));//Puerto donde se va a ejecutar el servidor
