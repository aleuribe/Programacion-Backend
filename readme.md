# Desafio 13 Coderhouse - Programacion Backend

# Previously:
1. El proyecto tiene una API en la ruta /api/productos-test que genera 5 productos aleatorios usando Faker.js.
Se puede acceder en formato tabla desde la ruta http://localhost/productos-test.

2. Se reformo el formato de los mensajes del chat y se utiliza normalizr para almacenar en el archivo chat.json la informacion normalizada. Luego se procesa en la aplicacion de forma denormalizada.

3. Se agrego un mecanismo sencillo que permite loguear un cliente por su nombre mediante un formulario de ingreso. Luego que se loguee, se muestra sobre el sitio un cartel de bienvenida con boton de logout. Al desloguearse, muestra mensaje de logout. 

4. Se mueven todas las claves y credenciales utilizadas a un archivo .env y se cargan mediante libreria dotenv. El puerto de escucha del servidor se lee usando yargs y en caso de no pasar este parametro se conecta por defecto al 8080.

5. Se agrega una ruta '/info' que presenta en una vista sencilla los siguientes datos:
- Argumentos de entrada
- Nombre de la plataforma (SO)
- Version de Node
- Memoria total reservada (rss)
- Path de ejecucion
- Process ID
- Carpeta del proyecto

6. Se agrega otra ruta /api/randoms que permite calcular una cantidad de numeros aleatorios del 1 al 1000 especificada por parametros query. Si el parametro no se ingresa, se calculan 100.000.000 numeros. El dato devuelto al frontend sera un objeto que contendra como claves los numeros random generados junto a la cantidad de veces que salio cada uno. La ruta no sera bloqueante (fork). Comprobar el no bloqueo con 500.000.000 randoms.

# Desafio 13: Servidor Nginx

1. Configurar Nginx para balancear cargas de la siguiente manera:
a. Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando el puerto 8081. El cluster sera creado desde node usando el modulo nativo cluster.

b. El resto de las consultas, redirigirlas a un servidor individual escuchando el puerto 8080.

c. Luego, modificar la configuracion para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiendolas equitativamente entre 4 instancias, escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.

Incluir el archivo de configuracion nginx junto con el proyecto.

Y un pequenio documento en donde se detallen los comandos que deben ejecutarse por linea de comandos y los argumentos que deben enviarse para levantar todas las instancias de servidores de modo que soporten la configuracion detallada anteriormente.

# Nota:
Para probar los parametros de ejecucion se corre el programa como node server.js --port xxxx.

## Nota 2:
Rutas disponibles para esta app:
1. GET /api/productos/:id -> devuelve productos por id
2. POST /api/productos -> agrega un producto nuevo
3. PUT /api/productos/:id -> Actualiza un producto según id
4. DELETE /api/productos/:id -> Elimina un producto según id

5. GET / -> Muestra la pagina web
6. POST /login -> Para inicio de sesión
7. GET /logout -> Para desbloqueo del usuario

8. GET /api/productos-test -> Genera productos 5 aleatorios

9. GET /info -> Muestra información general de ejecución del programa

10. GET /api/randoms?cant=xx -> Genera números aleatorios dependiendo del numero que coloques en xx

## Nota 3:
Los comandos para ejecutar las consignas del desafio 13 son:

### Consigna 1

Utilizando el archivo de configuración en nginx/config1:

`pm2 start server.js --name clusterserver --port 8081 --mode cluster` 

`pm2 start server.js --name forkserver --port 8080 --mode fork`

### Consigna 2

Utilizando el archivo de configuración en nginx/config2:

`pm2 start server.js --name server_1 --port 8080 --mode fork` 

`pm2 start server.js --name server_2 --port 8082 --mode fork`

`pm2 start server.js --name server_3 --port 8083 --mode fork`

`pm2 start server.js --name server_4 --port 8084 --mode fork`

`pm2 start server.js --name server_5 --port 8085 --mode fork`

# Configuracion del .env:
SECRET="ThisIsASecret"
MONGOSTRING="mongodb+srv://user:user123@cluster0.n3sme.mongodb.net/eCommerce"