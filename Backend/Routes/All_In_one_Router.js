const express=require("express");
const route =express.Router();



const CustomerController1 = require("../Controllers/User_Controller");

route.get("/test-api",CustomerController1.firstControll);
route.post("/Adding-Customer-Deatil-api",CustomerController1.Adding_CustomerDeatil);
route.post("/Cheking-Customer-Deatil-api",CustomerController1.Cheking_CustomerDeatil);
route.post("/Dispaly-Products-Deatil-api",CustomerController1.DispalyProducts);
route.post("/getRandom-ProductsBy-Category-api",CustomerController1.getRandomProductsByCategory);
route.post("/Cart-Prodect-Adding-api",CustomerController1.addOrUpdateCart);
route.post("/Cart-information-display-api",CustomerController1.CartDataForDisplay);
route.post("/Cart-Quantity-Increase-api",CustomerController1.CartProductQuantityIncrease);
route.post("/Cart-Quantity-Decrease-api",CustomerController1.CartProductQuantityDecrease);
route.post("/Cart-Prodect-Delete-api",CustomerController1.CartProdectDelete);


// Sendind order data to uesr
const CustomerController2 = require("../Controllers/Order_Controller");

route.post("/mail-sender-api",CustomerController2.MailSender);
route.post("/Order-ToTake-api",CustomerController2.OrderToTake);
route.post("/Order-Display-api",CustomerController2.OrderDisplay);
route.post("/Order-Update-api",CustomerController2.OrderUpdate);



const CustomerController3 = require("../Controllers/Farmer_Controller");

route.post("/Adding-Farmer-Deatil-api",CustomerController3.Adding_FarmersDeatil);
route.post("/Cheking-Farmer-Deatil-api",CustomerController3.Cheking_FarmerDeatil);
route.post("/ConformationOf-CostProdect-api",CustomerController3.ConformationOfCostProdect);
route.post("/Adding-Prodect-Sale-api",CustomerController3.AddingProdectInSale);
route.post("/Sale-information-display-api",CustomerController3.SaleDataForDisplay);
route.post("/FarmerData-Dispaly-display-api",CustomerController3.FarmerDataDispaly);

module.exports=route;