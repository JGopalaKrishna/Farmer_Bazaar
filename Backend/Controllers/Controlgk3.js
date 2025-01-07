const express = require("express");
const bodyParser=require("body-parser");

const {FarmersDeatil:FarmersDeatilDB ,FarmerSaleDeatil:FarmerSaleDeatilDB ,ProdectsDeatil:ProdectsDeatilDB} = require("../Model/Schemas1");
const Adding_FarmersDeatil = async (req, res) => {
    // console.log("Adding_CustomerDeatil");
    const data = req.body;
    // console.log(data);
    const existingUser = await FarmersDeatilDB.aggregate([
      { $match: { Email: data.Email } },
      { $limit: 1 }
    ]);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: "Email already exists." });
    }
    else{
      try {
          const newCustomer = new FarmersDeatilDB(data);
          await newCustomer.save(); // Wait for the save operation to complete
          return res.status(201).json("Adding_CustomerDeatils successfully");
      } catch (error) {
          return res.status(401).json("Adding_CustomerDeatils failed: " + error.message);
      }
    }
  };
  
  
  const Cheking_FarmerDeatil = async (req, res) => {
  
    const { Email: email, Password: password } = req.body;
    try {
      // Perform aggregation to find the farmer based on email and password
      const Farmer = await FarmersDeatilDB.aggregate([
        {
          $match: { Email: email, Password: password } // Match stage to filter farmers
        }
      ]);
      // console.log(Farmer);
      // Check if the farmer was found
      if (Farmer.length > 0) {
        return res.status(200).json("You are my user");
      } else {
        return res.status(404).json("Get out");
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

const ConformationOfCostProdect = async (req, res) => {
  var { Email: email, ProductName: product_name} = req.body;
  // console.log("ConformationOfCostProdect");
  var FarmerEmail = await FarmerSaleDeatilDB.aggregate([
    {
      $match: { "Email": email }
    }
  ]);
  
  // Check if FarmerEmail has any matching documents
  if (FarmerEmail.length > 0) {
    const products = FarmerEmail[0].products; // Access products from the first matching document
    const ProdtFound = products.some((prodt) => {
      return prodt.ProductName === product_name;
    });
  
    if (ProdtFound) {
      return res.status(206).json("Already existed");
    }
  }
  try{
    var productdata= await ProdectsDeatilDB.aggregate([
      {
          $match:{"ProductName":product_name}
      }
    ])
    // console.log(productdata);
    return res.status(201).json(productdata[0].ProductPrice);
  }catch{
  return res.status(204).json(0);
}
}

const AddingProdectInSale = async (req, res) => {
  var data = req.body;
  // console.log(data);
  var { Email: email, ProductName: product_name ,ProductQuantity:product_quantity} = data;
  var productdata=await ProdectsDeatilDB.aggregate([
    {
        $match:{"ProductName":product_name}
    }
  ])
  if(productdata!=null){
    productdata=productdata[0];
    var ThisProdectOrginalQuantity= productdata.ProductQuantity;
    productdata.ProductQuantity=product_quantity;
    delete productdata.ProductCategory;
    delete productdata.ProductAddToCart;
    delete productdata.ProductDescription; 
    delete productdata.ProductSalers;
    productdata.ProductTotal = productdata.ProductPrice * product_quantity;
  }
 try {
    // Check if the user already exists
    const FarmerSale = await FarmerSaleDeatilDB.findOne({ Email: email });
    // console.log(FarmerSale);
    if (!FarmerSale){
      // If user does not exist, create a new user and add the product
      const newCart = new FarmerSaleDeatilDB({
        Email: email,
        products: [productdata] // Add the new product to the array
      });
      await newCart.save();
      // console.log('farmer add product to the sale.');
    } else {
      // If user exists, check if the product is already in their cart
      const productExists = FarmerSale.products.some(product => product.ProductName === productdata.ProductName);

      if (!productExists) {
        // If the product does not exist, push it to the products array
        await FarmerSaleDeatilDB.updateOne(
          { Email: email },
          { $push: { products: productdata } }
        );
        // console.log('Product added to the farmer\'s sale.');


      } else {
        // If both user and product exist, do nothing
        // console.log('farmer added product already exist. No action taken.');
      }
    }
    await ProdectsDeatilDB.updateOne(
      { ProductId: productdata.ProductId }, // The filter to find the document
      { $push: {ProductSalers:{ Email: email, ProductQuantity:product_quantity }} ,
        $set: { ProductQuantity: ThisProdectOrginalQuantity+product_quantity } 
      } 
    );
    return res.status(200).json("added to sale")
  } catch (error) {
    console.error('Error adding or updating cart:', error);
    throw error;
  }
}

const SaleDataForDisplay = async(req,res)=>{
    var email=req.body[0];
    // console.log(email)
    try{
      var AllSaleData = await FarmerSaleDeatilDB.aggregate([
        {
          $match:{ "Email": email}
        }
      ])
      // console.log(AllSaleData);
      if(AllSaleData.length!=0){
        // console.log("AllSaleData",AllSaleData);
        return res.json(AllSaleData[0].products);
      }
      else{return res.json([]);}
    }
    catch(error) {
      console.error('not get data:', error);
      return res.status(500).json(error.message);
    }
}

const FarmerDataDispaly = async(req,res)=>{
  const email = req.body[0];
  // console.log(req.body);
  try {
    // Perform aggregation to find the farmer based on email and password
    const Farmer = await FarmersDeatilDB.aggregate([
      {
        $match: { Email: email} // Match stage to filter farmers
      }
    ]);
    // console.log("Farmer",Farmer);
    // Check if the farmer was found
    if (Farmer.length > 0) {
      return res.status(200).json(Farmer);
    } else {
      return res.status(404).json("Get out");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

  
exports.Adding_FarmersDeatil = Adding_FarmersDeatil;
exports.Cheking_FarmerDeatil = Cheking_FarmerDeatil;

exports.ConformationOfCostProdect = ConformationOfCostProdect;
exports.AddingProdectInSale=AddingProdectInSale;
exports.SaleDataForDisplay=SaleDataForDisplay;
exports.FarmerDataDispaly=FarmerDataDispaly;