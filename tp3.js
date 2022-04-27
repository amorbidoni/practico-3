const { json } = require('express/lib/response');
const fs = require('fs');

class Contenedor {
  constructor(filePath) {
    this.filePath = filePath;
    this.data = [];
    this.id = 0;
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.filePath, `utf-8`);
      if (data) {
        this.data = JSON.parse(data);
        this.data.map((product) => {
          this.id < product.id ? (this.id = product.id) : '';
        });
      }
      return JSON.parse(data);
    } catch (err) {
      throw new Error('no se pudo realizar la peticion' + err);
    }
  }

  // save

  async save(obj) {
    await this.getAll();
    this.id++;
    this.data.push({ ...obj, id: this.id });
    try {
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(this.data, null, 2)
      );
      return this.id;
    } catch (error) {
      throw new Error('Error al guardar: ' + error);
    }
  }

  async getById(productId) {
    await this.getAll();
    try {
      let item = this.data.filter((item) => item.id === productId);

      return item;
    } catch (error) {
      throw new Error('Error en la solicitur' + error);
    }
  }
  async deleteById(productId) {
    await this.getAll();
    try {
      let deleteIndex = this.data.findIndex((e) => e.id === productId);
      if (deleteIndex === -1) {
        console.log('Id no encontrado');
        return;
      } else {
        const deleteData = this.data.splice(deleteIndex, 1);
        await fs.promises.writeFile(
          this.filePath,
          JSON.stringify(this.data, null, 2)
        );
      }
      this.data = this.data.filter((item) => item.id !== productId);
      console.log(this.data);
      fs.writeFile(
        this.filePath,
        JSON.stringify(this.data, null, 2),
        (error) => {
          if (error) {
            throw new Error('error al eliminar ' + error);
          } else {
            console.log('guardado');
          }
        }
      );
      return this.data;
    } catch (error) {
      console.log(error);
    }
  }
  deleteAll() {
    this.data = [];
    fs.writeFile(this.filePath, JSON.stringify(this.data, null, 2), (error) => {
      if (error) {
        throw new Error('error al eliminar ' + error);
      } else {
        console.log('Eliminado');
      }
    });
    return Contenedor.products;
  }
}

let product = new Contenedor('./data.txt');

product.save({ name: 'asdasd', precio: 123, url: 'asdasdasd' });

// product.deleteAll();

module.exports = product;
