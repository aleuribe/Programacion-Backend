# Desafio 10 Coderhouse - Programacion Backend

# Desde el desafio 9:
## Consigna 1:
El proyecto tiene una API en la ruta /api/productos-test que genera 5 productos aleatorios usando Faker.js.
Se puede acceder en formato tabla desde la ruta http://localhost/productos-test

## Consigna 2:
Se reformo el formato de los mensajes del chat y se utiliza normalizr para almacenar en el archivo chat.json la informacion normalizada. Luego se procesa en la aplicacion de forma denormalizada.

# Desde el desafio 10:
Se agrego un mecanismo sencillo que permite loguear un cliente por su nombre mediante un formulario de ingreso. Luego que se loguee, se muestra sobre el sitio un cartel de bienvenida con boton de logout. Al desloguearse, muestra mensaje de logout.

## Nota:
Se migro la base de datos a Mongo Atlas para mayor practicidad a la hora de probar. Adicionalmente, se modifico la logica desde el desafio 9 para que tenga mas sentido segun lo sugerido.