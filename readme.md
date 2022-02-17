# Desafio 12 Coderhouse - Programacion Backend

# Desde el desafio 9:
## Consigna 1:
El proyecto tiene una API en la ruta /api/productos-test que genera 5 productos aleatorios usando Faker.js.
Se puede acceder en formato tabla desde la ruta http://localhost/productos-test

## Consigna 2:
Se reformo el formato de los mensajes del chat y se utiliza normalizr para almacenar en el archivo chat.json la informacion normalizada. Luego se procesa en la aplicacion de forma denormalizada.

# Desde el desafio 10:
Se agrego un mecanismo sencillo que permite loguear un cliente por su nombre mediante un formulario de ingreso. Luego que se loguee, se muestra sobre el sitio un cartel de bienvenida con boton de logout. Al desloguearse, muestra mensaje de logout.

# Desde el desafio 12:
1. Se mueven todas las claves y credenciales utilizadas a un archivo .env y se cargan mediante libreria dotenv. El puerto de escucha del servidor se lee usando yargs y en caso de no pasar este parametro se conecta por defecto al 8080.

2. Se agrega una ruta '/info' que presenta en una vista sencilla los siguientes datos:
- Argumentos de entrada
- Nombre de la plataforma (SO)
- Version de Node
- Memoria total reservada (rss)
- Path de ejecucion
- Process ID
- Carpeta del proyecto

3. Se agrega otra ruta /api/randoms que permite calcular una cantidad de numeros aleatorios del 1 al 1000 especificada por parametros query. Si el parametro no se ingresa, se calculan 100.000.000 numeros. El dato devuelto al frontend sera un objeto que contendra como claves los numeros random generados junto a la cantidad de veces que salio cada uno. La ruta no sera bloqueante (fork). Comprobar el no bloqueo con 500.000.000 randoms.

# Nota:
Para probar los parametros de ejecucion se corre el programa como node server.js --port xxxx.