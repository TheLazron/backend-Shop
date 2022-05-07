const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.getEditProduct = (req, res, next) => { 
  const edit = req.query.edit;

  if(!edit){
    console.log("cant edit");
    return res.redirect('/');
  }
  const productID = req.params.productID;

  Product.findByID(productID, product=>{

    if(!product){
      return res.redirect('/');
    }

    console.log(product);
  res.render('admin/edit-product', {pageTitle: 'Edit Product', editing: edit, path: '', product: product});
  })
  

}

exports.postEditProduct=((req, res, next) => {
    const productID = req.body.productID;
    console.log("editing postEditProd");
    console.log(productID);    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const newProduct = new Product(productID, title, imageUrl, price, description);
    newProduct.save();
    res.redirect('/admin/products');
})


exports.postAddProduct = (req, res, next) => {
  console.log("adding postAddProduct");
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, price, description);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};



exports.postDeleteProduct = (req, res, next) => {

const productID = req.body.productID;
Product.delete(productID, status=>{

  status;
});
  res.redirect('/');
}