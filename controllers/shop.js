const Product = require('../models/product');
const Cart = require('../models/cart'); 

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
  const productID = req.params.productID;
  Product.findByID(productID, product=>{
    
    res.render("shop/product-detail", {pageTitle: product.title, product: product,  path: '/products'});
  })
 
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart=>{
        Product.fetchAll(products => {
            const cartProducts=[];
            for (product of products) {
              const cartProductData = cart.products.find(prod=>prod.id === product.id);
                if(cartProductData){
                    
                  cartProducts.push({productData: product, qty: cartProductData.qty});
                }

            }
            res.render('shop/cart', {
              path: '/cart',
              pageTitle: 'Your Cart',
              cartItems: cart,
              products: cartProducts
            });
        
        
          })





  })
 
};


exports.postCart = (req, res, next) => {
  const productID = req.body.productID;
  Product.findByID(productID, product=>{
    Cart.addProduct(productID, product.price )
  })
  console.log("cartID"+ productID);
  res.redirect('/cart')
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};



exports.postCartDeleteProduct = (req, res, next) =>{
  const productID = req.body.productID
  console.log(productID);
  Product.findByID(productID, product=>{
      Cart.deleteProduct(productID, product.price);
      res.redirect('/cart');
  })
}