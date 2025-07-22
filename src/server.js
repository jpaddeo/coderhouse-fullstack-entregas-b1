import { join } from 'node:path';

import express from 'express';
import { engine } from 'express-handlebars';

import { Server } from 'socket.io';

import serverSocket from './server-socket.js';

import { __dirname } from './utils/dirname.js';

import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';
import viewsRouter from './routes/views.js';

import productsService from './services/products.js';
import cartsService from './services/carts.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', join(__dirname, '/../views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, '/../../public')));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

const server = app.listen(PORT, async () => {
  console.log(
    '[INICIO] - Validación y/o creación de archivo de datos de productos.'
  );
  await productsService.init();
  console.log(
    '[FIN] - Validación y/o creación de archivo de datos de productos.'
  );
  console.log(
    '[INICIO] - Validación y/o creación de archivo de datos de carritos.'
  );
  await cartsService.init();
  console.log(
    '[FIN] - Validación y/o creación de archivo de datos de carritos.'
  );
  console.log(
    `[SERVER ON] - El servidor de la ENTREGA 2 está ejecutándose en http://localhost:${PORT}`
  );
});

const io = new Server(server);
serverSocket(io);
app.io = io;
