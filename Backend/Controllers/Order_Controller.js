const express = require("express");
const nodemailer =require("nodemailer");
const bodyParser=require("body-parser");

const { CustomerDeatil: CustomerDeatilDB, CustomerCartDeatil:CustomerCartDeatilDB, ProdectsDeatil:ProdectsDeatilDB , FarmerOrderDeatil:FarmerOrderDeatilDB}=require("../Model/All_in_one_Schemas");

const MailSender= async (req,res,next)=>{
  var username=req.body[0];
  var User_data=await CustomerDeatilDB.aggregate([
    { $match: { UserName: username } }, // Match the username
    { $project: { Email: 1,FirstName: 1, _id: 0 } } // Project only the email field
  ]);
  // console.log(Rev_mail);
  const firstname=User_data[0].FirstName
  const Rev_mail=User_data[0].Email;

  var ProdectData =await CustomerCartDeatilDB.aggregate([
    { $match: { UserName: username } }
  ]);
  // console.log(ProdectData);
  if(ProdectData.length==0)return res.status(400).json("No data found");
  ProdectData=ProdectData[0].products;
  const generateProductHtml = (ProdectData) => {
    let html = `
    <h1>Thank You!</h1>
    <h2>Dear ${firstname},</h2>
    <h3>Thank you for visiting our store! We hope you had a great experience.</h3>
    <p><b>Here are the details of your purchase:<b/></p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px;">Product Name</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Quantity (Kg)</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Total</th>
        </tr>
    `;
  
    let totalSum = 0; // Initialize sum variable
  
    ProdectData.forEach(product => {
      html += `
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">${product.ProductName}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${product.ProductQuantity}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">₹${product.ProductTotal}</td>
        </tr>
      `;
      totalSum += product.ProductTotal; // Calculate total
    });
  
    // Add total sum row
    html += `
      <tr>
        <td colspan="2" style="border: 1px solid #ddd; padding: 8px; text-align: right;"><strong>Total:</strong></td>
        <td style="border: 1px solid #ddd; padding: 8px;">₹${totalSum}/-</td>
      </tr>
    `;
    html+='<p>We have received your order and it is now being proceessed.</p>'
    html += '</table>';
    return html;
  };

  const Transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"gkfarmerbazaar@gmail.com",
        pass:"dvih xxzu vumw rfvf"
    }
  });
  const MailOption={
    from:"gkfarmerbazaar@gmail.com",
    to:Rev_mail,
    subject:"ORDER DEATILS FROM FARMER BAZAAR",
    html:generateProductHtml(ProdectData),
  };
  Transporter.sendMail(MailOption,(err,info)=>{
    if(err)
      return res.status(500).json(err)
    else
      return res.status(200).json(info)
  });
};

const OrderToTake=async(req,res)=>{
  var username=req.body[0];
  var User_Data=await CustomerDeatilDB.aggregate([
    {$match: {UserName:username}}
  ])
  User_Data=User_Data[0];

  var User_cartData=await CustomerCartDeatilDB.aggregate([
    {$match: {UserName:username}}
  ])
  var User_cartData_Prodect = User_cartData[0].products;
  // console.log(User_cartData_Prodect);
  const orderPlacementTasks= await  User_cartData_Prodect.map(async(cdata)=>{
    var prodect_data = await ProdectsDeatilDB.aggregate([
      {$match: {ProductId:cdata.ProductId}}
    ])
    var Farmer_Email="";
    if(prodect_data[0].ProductSalers.length >0){
      Farmer_Email = prodect_data[0].ProductSalers[0].Email;
    }
    else{
      Farmer_Email="noFarmer@gmail.com";
    }

    var orderdata ={
    FirstName:User_Data.FirstName,
    PhoneNumber:User_Data.PhoneNumber,
    Address:User_Data.Address,
    ProductName: cdata.ProductName,
    ProductPrice: cdata.ProductPrice,
    ProductQuantity: cdata.ProductQuantity,
    ProductTotal: cdata.ProductTotal,
    }
    try {
      // Check if the user already exists
      const farmerOrder = await FarmerOrderDeatilDB.findOne({ Email: Farmer_Email }).lean();
      // console.log("farmerOrder",farmerOrder)
      // if (farmerOrder.length==0){
      if (!farmerOrder){
        // If user does not exist, create a new user and add the product
        const newCart = new FarmerOrderDeatilDB({
          Email: Farmer_Email,
          Orders: [orderdata] // Add the new product to the array
        });
        await newCart.save();
        console.log('order placed saved');
      } else {
          await FarmerOrderDeatilDB.updateOne(
            { Email: Farmer_Email },
            { $push: { Orders: orderdata }}
          )
          // console.log('Farmer exist. added order data');
        }
        await Promise.all(orderPlacementTasks);
        return res.status(200).json("Order placed successfully.");
    } catch (error) {
      console.error('no orderplaced', error);
    }
  })
  return res.status(200).json("order placed"); 

}


const OrderDisplay = async (req,res)=>{
  var email = req.body[0];
  var Email_order_data= await FarmerOrderDeatilDB.aggregate([
    {$match: {Email:email}},
    { $limit: 1 }
  ])
  if(Email_order_data.length>0){
  // console.log(Email_order_data[0].Orders);
  var Order_data=Email_order_data[0].Orders
  return res.status(200).json(Order_data)
  }
  else{
  return res.status(200).json([])
  }
}

const OrderUpdate = async (req, res) => {
  try {
    const email = req.body[0];
    const Order_data=req.body[1];
      const result = await FarmerOrderDeatilDB.updateOne(
        { Email: email },
        { $set: { Orders: Order_data } }
      );
      if (result.modifiedCount > 0) {
        return res.status(200).json({ message: "Orders updated successfully"});
      } else {
        return res.status(400).json({ message: "Failed to update orders" });
      }
  }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
}


exports.MailSender=MailSender;
exports.OrderToTake=OrderToTake;
exports.OrderDisplay=OrderDisplay;
exports.OrderUpdate=OrderUpdate;