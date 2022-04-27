const express = require('express');
const Contenedor = require('./tp3');

const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`server corriendo en el puerto ${PORT}`);
});

server.on('error', (error) => {
  throw new Error(`error en el servidor ${error}`);
});

//

app.get('/', (req, res) => {
  res.send(`<h1>ingresa a <a href='/productos' >productos</a></h1>`);
});

app.get('/productos', async (req, res) => {
  let products = await Contenedor.getAll();
  res.send(products);
});

app.get('/productRandom', async (req, res) => {
  let products = await Contenedor.getAll();
  let max = products.length;
  let min = 1;
  let randomIndex = Math.floor(Math.random() * max);
  res.send(products[randomIndex]);
});
