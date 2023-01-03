const fs = require('fs');

const db = require("../util/database")

const Cart = require('./cart');


module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
      if (this.id) {
        db.execute(`UPDATE products SET title ="${this.title}",price="${this.price}",description="${this.description}",imageUrl = "${this.imageUrl}" WHERE id ="${this.id}"`)
        .catch(err=>console.log(err))
      } else {
      return db.execute(`INSERT INTO products(title,price,description,imageUrl) VALUES("${this.title}","${this.price}","${this.description}","${this.imageUrl}")`)
      }
    ;
  }
  static deleteById(id) {
   db.execute(`DELETE FROM products WHERE id="${id}"`)
   .catch(err=>console.log(err))
  }

  // static fetchAll(cb) {
  //   db.execute("SELECT * FROM products")
  //   .then(results=>cb(results[0]))
  //   .catch(err=>console.log(err))
  // }
  static fetchAll() {
  return  db.execute("SELECT * FROM products")
  }

  static findById(id) {
  return db.execute(`SELECT * FROM products WHERE id = "${id}"`)
  
}
static fetchById(id,cb){
  db.execute(`SELECT * FROM products WHERE id = "${id}"`)
  .then(([rows,fieldData])=>cb(rows))
  .catch(err=>console.log(err))
}
};
