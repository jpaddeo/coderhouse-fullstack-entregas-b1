import productsService from './services/products.js';

export default function serverSocket(io) {
  io.on('error', (error) => {
    console.error('[SOCKET] - Error en el servidor de WebSocket:', error);
  });
  io.on('connection', (socket) => {
    console.log('[SOCKET] - Cliente conectado');

    socket.on('disconnect', () => {
      console.log('[SOCKET] - Cliente desconectado');
    });

    socket.on('socket:products_create', async (data) => {
      try {
        await productsService.add(data);
        const products = await productsService.getAll();
        socket.emit('socket:products_update', products);
      } catch (error) {
        socket.emit('socket:error', error.message);
      }
    });

    socket.on('socket:products_delete', async (data) => {
      try {
        const { pid } = data;
        await productsService.delete(pid);
        const products = await productsService.getAll();
        socket.emit('socket:products_update', products);
      } catch (error) {
        socket.emit('socket:error', error.message);
      }
    });
  });
}
