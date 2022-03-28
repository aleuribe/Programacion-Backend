# Titulo del proyecto

eCommerce Entrega 3 del proyecto final de Coderhouse

## ¿De que se trata?

Esta es la tercera entrega del proyecto final del curso de Backend de Coderhouse, donde se implementaron todos los temas aprendidos hasta ahora.

Incorporadas las siguientes funciones:
1. Se incorporo una pagina inicial para iniciar sesion o crear nuevo usuario.
2. El inicio de sesion se verifica usando passport local con validacion de password que se almacena encriptado en la base de datos.
3. Envio de mensajes via correo y whats app al registrarse un nuevo usuario y al realizar una compra de un carrito.
4. Se puede habilitar el modo cluster del servidor por medio de parametros de ejecucion (ver seccion de como se usa)

Pendiente por incorporar:
1. Manejo de los loggers.
2. Incorporacion de la foto del usuario.

## ¿Como se usa?

Se puede ejecutar el siguiente comando:
`npm start` sobre el directorio del package.json y esto ejecutara el proyecto con los parametros por defecto. Esto es: mode: mongodb, run: cluster, port: 8080.

Se puede parametrizar la ejecucion ejecutando el siguiente comando:
`node src/main.js --dao dao_mode --mode modo_run --port puerto`
Donde:

* dao: file (ejecucion local al 100%) o mongodb (usando MongoDB Atlas)

* mode: cluster o fork

* port: puerto de ejecucion


## ¿Que herramientas se utilizaron?

* [Visual Studio Code](https://code.visualstudio.com/) - La IDE para facilitar el desarrollo y debug con HTML5 y CSS
* [express](https://expressjs.com/es/) - Para el servicio web de la api
* [Node.js](https://nodejs.org/es/) - Para facilitar el manejo de la paqueteria
* [Bootstrap](https://getbootstrap.com/) - Para facilitar el user graphic interface
* [MongoDB Atlas](https://cloud.mongodb.com) -- Para el manejo de base de datos en la nube
* [Nodemailer](https://nodemailer.com/) -- Para el envio de mensajes
* [Ethereal](http://ethereal.email) -- Servidor de correo gratuito
* [Twilio](https://twilio.com) -- Para manejar la mensajeria

## Versionado

Se utilizo [Git](https://git-scm.com/) para facilitar el manejo del versionado de una manera mas sencilla.

## Autor

* **Alejandro Uribe** - *Primer desarrollo Backend* - [eCommerce Basico - Entrega 1](https://proyecto-final-1-coderhouse.herokuapp.com)

## Licencia

Este proyecto esta licenciado bajo la MIT License

## Reconocimientos

* Al equipo de Coderhouse

