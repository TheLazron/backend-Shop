const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {

    getProductsFromFile(products=>{
        if(this.id){
          console.log("updating");
          const existingProductIndex = products.findIndex(product=>product.id===this.id);
          const updatedProducts = [...products];
          updatedProducts[existingProductIndex] = this;
          console.log(existingProductIndex);
          fs.writeFile(p, JSON.stringify(updatedProducts), err=>{
              console.log(err);
          })
        }else{
          console.log("adding");
          this.id = parseInt(Math.random()*100000).toString();
          getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
              console.log(err);
        
            });
          });


        }
      
    })

   
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findByID(id, cb){
    getProductsFromFile(products=>{
       const product= products.find(p=> p.id===id);
       
       cb(product);

    })
   
  }

  static delete(id, cb){

    getProductsFromFile(products=>{

      //shortcut:   const updatedProducts = products.filter(product=>product.id!==id);  return copy of the array after excluding the product whose id matches the id of the product we wish to delete
      //            fs.writeFile(p, updatedProducts, err=>console.log(err));        


     const productIndex=  products.findIndex(product=>product.id===id);
      console.log(productIndex);
      if (productIndex=>0) {
        console.log(products);
        products.splice(productIndex, 1);
        console.log(products);
        fs.writeFile(p, JSON.stringify(products), err=>{

            if (err) {
              cb(err);
            }
            else{
              cb("deleted");
            }
        })
      } else {
        console.log("Deletion Unsuccessful");
      }

    })


  }
};
