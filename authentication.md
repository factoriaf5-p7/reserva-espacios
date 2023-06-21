# AUTHENTICATION

## Proceso de autenticación
1. Registro del usuario
2. Autenticación del usuario (validación del usuario)
3. Autorización: acceso a funciones o recursos de nuestra aplicación.

## Registro de una usuaria
1. Envío de datos personales desde un formulario de front-end:
   1. email
   2. password - con confirmación
   3. ...catchaps / i am not a robot.
2. Enviamos los datos al backend
   1. POST: habilita el body para el envío de información.
   Con GET tendría que enviar la info en la url: http://localhost:3000/auth/register?email=raul@mail.com&password=1234 con POST puedo enviar la info en el body.
   2. Controller / controlador escucha la petición de tipo POST
   3. El controller extrae la información de la Request (request.body)
   4. El controller envía la información al Service
   5. El service encripta la password
   6. El service envía la información a la bbdd
   7. La bbdd devuelve una información al service
   8. El service devuelve una respuesta al controller
3. El controller devuelve una respuesta al front-end.



## Autenticación
[![](https://mermaid.ink/img/pako:eNp9U11LwzAU_SshTx10fyAPe3EgiKKwqS8BuabXGdbe1Jt0ImP_3SStbm5BCqHcc07O_cpeGtegVNLjx4BkcGlhw9Bp0tQDB2tsDxSEaS1S-Bu7dRtLV44Cu7ZFLoAr5J01-Bd5gtY2EKwrw2u3RbpGQobguEh59HgExszEfLE4T0iJ3vlQYQe2rXvw_tNxM9N0RjtKpzuV2I0pYjKqhniojC_X9z_yiZq1J-koscGQVdk1sk9AMb90YgwDk0gehZsvWqWEcV1sBT5M5fiK0-B8qCMPXsFj9LyQZeeiceABC8bFIaTicgRvnte_BRap_5QaEv_csji9guB0akkzDj9Rfe_IY7UHY9D7lyw6zNIaj5-sZYccc27isu81CaFleMcOtVTxtwHeaqnpEHkwBLf6IiNV6k4thz7twvQwpHqD1scoNjbWeze-nvyIDt_z5zl2?type=png)](https://mermaid.live/edit#pako:eNp9U11LwzAU_SshTx10fyAPe3EgiKKwqS8BuabXGdbe1Jt0ImP_3SStbm5BCqHcc07O_cpeGtegVNLjx4BkcGlhw9Bp0tQDB2tsDxSEaS1S-Bu7dRtLV44Cu7ZFLoAr5J01-Bd5gtY2EKwrw2u3RbpGQobguEh59HgExszEfLE4T0iJ3vlQYQe2rXvw_tNxM9N0RjtKpzuV2I0pYjKqhniojC_X9z_yiZq1J-koscGQVdk1sk9AMb90YgwDk0gehZsvWqWEcV1sBT5M5fiK0-B8qCMPXsFj9LyQZeeiceABC8bFIaTicgRvnte_BRap_5QaEv_csji9guB0akkzDj9Rfe_IY7UHY9D7lyw6zNIaj5-sZYccc27isu81CaFleMcOtVTxtwHeaqnpEHkwBLf6IiNV6k4thz7twvQwpHqD1scoNjbWeze-nvyIDt_z5zl2)

## Autorización

Una usuaria logada quiere acceder a una ruta protegida:
1. Envía petición al end-point protegido con el token informado. `GET http://localhost:3000/user/:id/profile`
2. Antes de que llegue la petición al controller, la petición tiene que atravesar un filtro (middleware) --> en Nest.js se llama **GUARD**
3. El authGuard comprueba que hay un token
4. El authGuard desencripta el token e inyecta el payload (id, email) en la request
5. El authGuard deja pasar
6. El userService realiza una consulta con el email o el id del user
7. El userService compara si el id de la bbdd es igual al id del parámetro(:id) deja pasar
   (en el caso de autorización por rol comprobaría que el usuario tiene el rol adecuado)
8. El userService obtiene los datos del profile
9. El userService devuelve los datos al controller
10. EL controller devuelve la info al client.