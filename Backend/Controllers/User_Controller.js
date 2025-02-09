const express = require("express");
const bodyParser=require("body-parser");

const { CustomerDeatil: CustomerDeatilDB, CustomerCartDeatil:CustomerCartDeatilDB, ProdectsDeatil:ProdectsDeatilDB}=require("../Model/All_in_one_Schemas");


const sampleControll= async(req,res)=>{
    // console.log("It's working");
    return res.status(200).json("It's working");
}

const Adding_CustomerDeatil = async (req, res) => { 
  const data = req.body;
  // console.log("Adding_CustomerDeatil");

  const existingUser = await CustomerDeatilDB.aggregate([
    { $match: { UserName: data.UserName } },
    { $limit: 1 }
  ]);
  // console.log(existingUser);
  if (existingUser.length > 0) {
    return res.status(409).json({ message: "Username already exists." });
  }
  else{
    try {
        const newCustomer = new CustomerDeatilDB(data);
        // console.log(data);
        await newCustomer.save(); // Wait for the save operation to complete
        return res.status(201).json("Adding_CustomerDeatils successfully");
    } catch (error) {
        // Check if the error is a ValidationError
        // if (error.name === 'ValidationError') {
        //   const validationErrors = Object.keys(error.errors).map((key) => {
        //     return `${key}: ${error.errors[key].message}`;
        //   });
        //   return res.status(400).json({ message: "Validation errors", errors: validationErrors });
        // }
        // For any other error, return a general error message
        return res.status(401).json("Adding_CustomerDeatils failed: " + error.message);
    }
  }
};


const Cheking_CustomerDeatil = async (req, res) => {

  const { UserName: username, Password: password } = req.body;
  try {
    // Perform aggregation to find the farmer based on email and password
    const Customer = await CustomerDeatilDB.aggregate([
      {
        $match: { UserName: username, Password: password } // Match stage to filter Customers
      }
    ]);

    // Check if the Customer was found
    if (Customer.length > 0) {
      return res.status(200).json("You are my user");
    } else {
      return res.status(404).json("Get out");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------
const DispalyProducts = async(req,res)=>{
  // console.log("DisplayProdects");
  var username=req.body[0];
  // console.log(username);
  if(username==null){
    var products = await ProdectsDeatilDB.aggregate([
      { $match: {} }
    ]);
    return res.status(202).json(products);
  }
  try {
    const Customer = await CustomerDeatilDB.aggregate([
      { $match: { UserName: username} }
    ]);
    // console.log(Customer);
    var UserAddedCartItems=Customer[0].CartItemsid;
    var products = await ProdectsDeatilDB.aggregate([
      { $match: {} }
    ]);
    // console.log(products);
    if(UserAddedCartItems.length>0){
      // console.log(Customer[0].CartItemsid,"IN DispalyProducts");
      products = products.map(product => {
        if (UserAddedCartItems.includes(product.ProductId.toString())) {
          product.ProductAddToCart = true; // Assuming this field exists
        }
        return product;
      });
    }
    return res.status(202).json(products);
  } catch (err) {
    console.error(err);
    return res.status(404).json("not found");
  }
}

const getRandomProductsByCategory = async(req,res)=>{
  const { UserName: username, Category: category } = req.body;
  // console.log("getRandomProductsByCategory",username)
 if(username!=null){
  try {
    const Customer = await CustomerDeatilDB.aggregate([
      { $match: { UserName: username} }
    ]);
    // console.log(Customer);
    var UserAddedCartItems=Customer[0].CartItemsid;

    var products = await ProdectsDeatilDB.aggregate([
      { $match: {ProductCategory: category } }, // Match the category
      { $sample: { size: 4 } } // Randomly select 4 items
    ]);

    // console.log(products);
    if(UserAddedCartItems.length>0){
      // console.log(Customer[0].CartItemsid,"IN DispalyProducts");
      products = products.map(product => {
        if (UserAddedCartItems.includes(product.ProductId.toString())) {
          product.ProductAddToCart = true; // Assuming this field exists
        }
        return product;
      });
    }
    return res.status(202).json(products);
  } catch (err) {
    console.error("Error fetching random products:", err);
    return [];
  }
 }else{
    try{
      var products = await ProdectsDeatilDB.aggregate([
        { $match: {ProductCategory: category } }, // Match the category
        { $sample: { size: 4 } } // Randomly select 4 items
      ]);
      return res.status(202).json(products);
    } catch (err) {
      console.error("Error fetching random products:", err);
      return [];
    }
  }
}


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------

const addOrUpdateCart= async (req,res )=>{
//  console.log("addOrUpdateCart");
 var data = req.body;
 var { UserName: username, ProductId: productid } = data;
 const userCartPId = await CustomerDeatilDB.updateOne(
    { UserName: username},
    { $addToSet: { CartItemsid: productid } }
  );
 var productdata=await ProdectsDeatilDB.aggregate([
    {
        $match:{"ProductId":productid}
    }
 ])
 productdata=productdata[0];

 productdata.ProductQuantity=1;

 delete productdata.ProductCategory;
 delete productdata.ProductAddToCart;
 delete productdata.ProductDescription;
 delete productdata.ProductSalers;

 productdata.ProductTotal = productdata.ProductPrice;
//  console.log(productdata);
  try {
    // Check if the user already exists
    const userCart = await CustomerCartDeatilDB.findOne({ UserName: username });

    if (!userCart){
      // If user does not exist, create a new user and add the product
      const newCart = new CustomerCartDeatilDB({
        UserName: username,
        products: [productdata] // Add the new product to the array
      });
      await newCart.save();
      // console.log('User and product added to the cart.');
    } else {
      // If user exists, check if the product is already in their cart
      const productExists = userCart.products.some(product => product.ProductId === productdata.ProductId);

      if (!productExists) {
        // If the product does not exist, push it to the products array
        await CustomerCartDeatilDB.updateOne(
          { UserName: username },
          { $push: { products: productdata } }
        );
        // console.log('Product added to the user\'s cart.');
      } else {
        // If both user and product exist, do nothing
        // console.log('User and product already exist. No action taken.');
      }
    }

    return res.status(200).json("added to cart")
  } catch (error) {
    console.error('Error adding or updating cart:', error);
    throw error;
  }
}

const CartDataForDisplay = async(req,res)=>{
  var username=req.body[0];
  // console.log(username)
  if(username==null)return res.json([]);
  try{
    var AllCartData = await CustomerCartDeatilDB.aggregate([
      {
        $match:{ "UserName": username}
      }
    ])
    // console.log(AllCartData[0].products);
    if(AllCartData.length!=0){
      // console.log("AllCartData",AllCartData);
      return res.json(AllCartData[0].products);
    }
    else{return res.json([]);}
  }
  catch(error) {
    console.error('not get data:', error);
    return res.status(500).json(error.message);
  }
}

const CartProductQuantityIncrease = async(req,res)=>{
  var data=req.body;
  var { UserName: username, ProductId: productid } = data;
  // console.log("CartProductQuantityIncrease");
  try {
    const result = await CustomerCartDeatilDB.updateOne(
      { 
        UserName: username, 
        "products.ProductId": productid
      },
      {
        $inc: { "products.$.ProductQuantity": 1 }
      }
    );
    // console.log(username,productid);
    await CartProductTotalUpdate(req,res);
  } catch (error) {
    console.error("Error updating product quantity:", error);
    return res.status(401).json(" Not Updated");
  }
}

const CartProductQuantityDecrease = async(req,res)=>{
  // console.log("CartProductQuantityDecrease");
  var data=req.body;
  var { UserName: username, ProductId: productid } = data;
  try {
    var cart = await CustomerCartDeatilDB.findOne(
      { UserName: username, "products.ProductId": productid },
      { "products.$": 1 }
    );
    cart=cart.products[0].ProductQuantity;
    // console.log(cart);
    if(cart>1){
      const result = await CustomerCartDeatilDB.updateOne(
        { 
          UserName: username,
          "products.ProductId": productid
        },
        { $inc: { "products.$.ProductQuantity": -1 }}
      );
      // console.log("Update Result:", result);
      await CartProductTotalUpdate(req,res);
    }
    else{ await CartProdectDelete(req,res); }
  } catch (error) {
    console.error("Error updating product quantity:", error);
    return res.status(401).json(" Not Updated");
  }
}

const CartProductTotalUpdate = async(req,res)=>{
  var data=req.body;
  var { UserName: username, ProductId: productid } = data;
  try{
    var total_result = await CustomerCartDeatilDB.aggregate([
      {
        $match: { 
          UserName: username, 
          "products.ProductId": productid 
        }
      },
      {$unwind: "$products" },// Unwind the products array
      {$match: {"products.ProductId": productid }},// Match again after unwinding
      {
        $project: {
          ProductQuantity: "$products.ProductQuantity",
          ProductPrice: "$products.ProductPrice",
          ProductTotal: { 
            $multiply: [ "$products.ProductQuantity", "$products.ProductPrice" ] 
          }
        }
      }
    ]);
    // console.log(total_result);
    if(total_result.length>0){
      // console.log("Updating the ProductTotal");
      total_result=total_result[0].ProductTotal;
      const update_total = await CustomerCartDeatilDB.updateOne(
        { 
          UserName: username, 
          "products.ProductId": productid
        },
        {
          $set: { "products.$.ProductTotal": total_result }
        }
      );
    }
    return res.status(201).json("Updated");
  }
  catch (error) {
    console.error("Error updating product quantity:", error);
    return res.status(401).json(" Not Updated");
  }
}


const CartProdectDelete = async(req,res)=>{
  // console.log("CartProdectDelete");
  var data=req.body;
  var { UserName: username, ProductId: productid } = data;
  const userCartPId = await CustomerDeatilDB.updateOne(
    { UserName: username }, // The filter to find the document
    { $pull: { CartItemsid: productid } } // Remove the specified productid from the 'CartItemsid' array
  );
  try {
    const result = await CustomerCartDeatilDB.updateOne(
      { UserName: username }, // Match the user
      {
        $pull: { products: { ProductId: productid } // Pull the product with the specified ProductId
        }
      }
    );
    // console.log("Deletion Result:", result);
    return res.status(200).json("Deleted Sucessfully");
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(401).json(" Not Updated");
  }
}





exports.firstControll=sampleControll;
exports.Adding_CustomerDeatil = Adding_CustomerDeatil;
exports.Cheking_CustomerDeatil = Cheking_CustomerDeatil;

exports.DispalyProducts = DispalyProducts;
exports.getRandomProductsByCategory = getRandomProductsByCategory;

exports.addOrUpdateCart=addOrUpdateCart;
exports.CartDataForDisplay=CartDataForDisplay;
exports.CartProductQuantityIncrease=CartProductQuantityIncrease;
exports.CartProductQuantityDecrease=CartProductQuantityDecrease;
exports.CartProdectDelete=CartProdectDelete;