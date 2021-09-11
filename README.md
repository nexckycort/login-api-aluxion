# login-api-aluxion

## swagger

<https://login-api-aluxion.herokuapp.com/api-docs/>

### Pre-requisitos 📋

_Tener instalado Docker, NodeJS y npm_

[Docker](https://www.docker.com/products/docker-desktop)

[NodeJS](https://nodejs.org/)

[npm](https://www.npmjs.com/)

### Instalación 🔧

_1. Ejecutamos `docker-compose up -d` estando en la raiz del proyecto._

_2. Creamos un archivo `.env-cmdrc.json` igual que `.env-cmdrc.example.json`_

_3. Para el envio de email en un entorno de desarrollo recomiendo [mailtrap](https://mailtrap.io/)._

_4. Reconstruir los modulos de Node, lo hacemos ejecuando el siguiente comando estando en la raiz del proyecto_

```
npm ci
```

_5. Levantar el servidor, estando en la raiz del proyecto_

`npm start` para un entorno de producción o `npm run dev` para un entorno de desarrollo
