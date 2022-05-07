const { log } = require('console');
const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

module.exports = class Cart{

static addProduct(id, productPrice){

        fs.readFile(p, (err, fileContent)=>{
            let cart = {products: [], totalPrice:0}
            if(!err){
                cart =JSON.parse(fileContent);
                console.log(cart);
            }
            console.log(cart.products);
            const existingProductIndex = cart.products.findIndex(product => product.id=== id);
            const existingProduct = cart.products[existingProductIndex];
    
            let updatedProduct;
            if(existingProduct){
                updatedProduct = {...existingProduct};
                updatedProduct.qty+=1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex]=updatedProduct;
            }
            else{   
                updatedProduct ={id: id, qty:1}
                cart.products = [...cart.products, updatedProduct];
            }
    
            cart.totalPrice += +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err=>{
                console.log(err);
            })

        //Analyse the cart if the product to be added already has an instance in the cart read from the file
      
    })
    }

    static getCart(cb){
        fs.readFile(p, (err, fileContents)=>{
            const cart = JSON.parse(fileContents);
            if(err){
                cb(null);
            }
            else{
                cb(cart);
            }
        })
    }

    static deleteProduct(id, price){
        this.getCart(cart=>{
      

            
            const product=cart.products.find(product=>product.id === id);
            if (product.qty==1) {
                const updatedProducts = cart.products.filter(product=>product.id!==id);
                cart.products = [...updatedProducts];
                cart.totalPrice=cart.totalPrice-price;
                
                fs.writeFile(p, JSON.stringify(cart), err=>{
                    console.log(err);
                })
            }
            else{
                product.qty--;
                cart.totalPrice=cart.totalPrice-price;
                fs.writeFile(p, JSON.stringify(cart), err=>{
                    console.log(err);
                })
            }
            console.log(product);

        })

    }

}
