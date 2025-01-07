const express =require('express');
const mongoose=require('mongoose');


const CustomerDeatils = new mongoose.Schema({
  UserName:{ type:String, required: true },
  Password:{ type:String,required: true },
  FirstName:{ type:String, required: true },
  PhoneNumber:{ type:Number, required: true },
  Email:{ type:String, required: true },
  Address:{ type:String,required: true },
  CartItemsid: { type: [String], default: [] },
  LikeItemsid: { type: [String], default: [] }
})

const ProdectsDeatils = new mongoose.Schema({
  ProductId: { type: String, required: true, },
  ProductName: { type: String, required: true, },
  ProductImage:{ type: String, required: true, },
  ProductPrice: { type: Number, required: true, },
  ProductQuantity: { type: Number, required: true, },
  ProductCategory: { type: String, required: true, },
  ProductAddToCart: { type: Boolean, required: true, default:false },
  ProductDescription: { type: String, required: true, },
  ProductSalers: {
    type: [{
      Email: { type: String, required: true },
      ProductQuantity: { type: String, required: true }
    }],
    default: null // Set default to null
  }
})



const CustomerCartDeatils = new mongoose.Schema({
  UserName:{ type:String, required: true },
  products:[{
    ProductId: { type: String, required: true, },
    ProductName: { type: String, required: true, },
    ProductImage:{ type: String, required: true,     },
    ProductPrice: { type: Number, required: true, },
    ProductQuantity: { type: Number, required: true, },
    ProductTotal: { type: Number, required: true, },
 }]
})

const FarmersDeatils = new mongoose.Schema({
  RegisterId:{ type:String, required: true },
  Name:{ type:String, required: true },
  PhoneNumber:{ type:Number, required: true },
  Email:{ type:String, required: true },
  Password:{ type:String,required: true },
  Address:{ type:String,required: true },
  ProduceType:{type:String ,required: true },
  Experience:{type:Number ,required: true }
})

const FarmerSaleDeatils = new mongoose.Schema({
  Email:{ type:String, required: true },
  products:[{
    ProductId: { type: String, required: true, },
    ProductName: { type: String, required: true, },
    ProductImage:{ type: String, required: true,     },
    ProductPrice: { type: Number, required: true, },
    ProductQuantity: { type: Number, required: true, },
    ProductTotal: { type: Number, required: true, },
    Sold:{ type: Boolean, required: true, default:false }
  }],
})

const FarmerOrderDeatils = new mongoose.Schema({
  Email:{ type:String, required: true },
  Orders:[{
    FirstName:{ type:String, required: true },
    PhoneNumber:{ type:Number, required: true },
    Address:{ type:String,required: true },
    ProductName: { type: String, required: true, },
    ProductPrice: { type: Number, required: true, },
    ProductQuantity: { type: Number, required: true, },
    ProductTotal: { type: Number, required: true, },
    Delivery:{type: Boolean,required: true, default:false}
  }]
})


const CustomerDeatil = mongoose.model("CustomerDeatils",CustomerDeatils);
const ProdectsDeatil = mongoose.model("ProdectsDeatils",ProdectsDeatils);
const CustomerCartDeatil = mongoose.model("CustomerCartDeatils",CustomerCartDeatils);
const FarmersDeatil = mongoose.model("FarmersDeatils",FarmersDeatils);
const FarmerSaleDeatil = mongoose.model("FarmerSaleDeatils",FarmerSaleDeatils);
const FarmerOrderDeatil = mongoose.model("FarmerOrderDeatils",FarmerOrderDeatils);

module.exports = {
  CustomerDeatil,
  CustomerCartDeatil,
  ProdectsDeatil,
  FarmersDeatil,
  FarmerSaleDeatil,
  FarmerOrderDeatil
};